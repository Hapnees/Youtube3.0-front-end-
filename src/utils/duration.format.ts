export const durationFormat = (duration: number) => {
	const _duration = Math.trunc(duration)
	let sec: string | number
	let min: string | number
	let hour: string | number

	const first = Math.trunc(_duration / 60)
	if (first > 60) {
		sec = _duration - first * 60
		hour = Math.trunc(first / 60)
		min = first - hour * 60

		sec = sec.toString().length === 1 ? 0 + sec.toString() : sec
		min = min.toString().length === 1 ? 0 + min.toString() : min
		hour = hour.toString().length === 1 ? 0 + hour.toString() : hour

		return `${hour}:${min}:${sec}`
	}

	min = first
	sec = _duration - first * 60

	sec = sec.toString().length === 1 ? 0 + sec.toString() : sec
	min = min.toString().length === 1 ? 0 + min.toString() : min

	return `${min}:${sec}`
}
