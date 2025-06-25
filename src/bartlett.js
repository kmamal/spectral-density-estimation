const { periodogram } = require('./periodogram')

const bartlett = (arr, options = {}) => {
	const N = arr.length

	const {
		k = 3,
	} = options

	const M = Math.floor(N / k)
	const P = Math.floor(M / 2)
	const result = new Array(P).fill(0)

	let start = 0
	let end = M
	for (let i = 0; i < k; i++) {
		const { periodogram: part } = periodogram(arr.slice(start, end))
		start = end
		end += M
		for (let j = 0; j < P; j++) { result[j] += part[j] }
	}

	for (let j = 0; j < P; j++) { result[j] /= k }

	return {
		periodogram: result,
		frequencyStep: 1 / M,
	}
}

module.exports = { bartlett }
