const Num = require('@kmamal/numbers/js')
const { fftReal } = require('@kmamal/fft/fft').defineFor(Num)
const { magnitudeSquared } = require('@kmamal/fft/magnitude').defineFor(Num)

const periodogram = (arr) => {
	const N = arr.length
	const powerOfTwo = 2 ** Math.ceil(Math.log2(N))
	const padded = [ ...arr, ...new Array(powerOfTwo - N).fill(0) ]

	const result = magnitudeSquared(fftReal(padded))
		.slice(0, Math.floor(N / 2))
		.map((x) => x / powerOfTwo)

	return {
		periodogram: result,
		frequencyStep: 1 / N,
	}
}

module.exports = { periodogram }
