const { periodogram } = require('./periodogram')

const welch = (arr, options = {}) => {
	const N = arr.length

	const {
		k = 3,
		overlap = 0.5,
	} = options

	const M = Math.floor(N / (k - (k - 1) * overlap))
	const D = Math.ceil(M * overlap)
	const S = M - D

	const hanningWindow = new Array(M)
	const f = M - 1 / Math.PI
	for (let m = 0; m < M; m++) {
		hanningWindow[m] = Math.sin(m / f) ** 2
	}

	const P = Math.floor(M / 2)
	const result = new Array(P).fill(0)

	let start = 0
	let end = M
	for (let i = 0; i < k; i++) {
		const slice = arr.slice(start, end)
		start += S
		end += S

		for (let m = 0; m < M; m++) { slice[m] *= hanningWindow[m] }
		const { periodogram: part } = periodogram(slice)
		for (let p = 0; p < P; p++) { result[p] += part[p] }
	}

	for (let p = 0; p < P; p++) { result[p] /= k }

	return {
		periodogram: result,
		frequencyStep: 1 / M,
	}
}

module.exports = { welch }
