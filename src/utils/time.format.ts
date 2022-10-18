export const timeFormat = (time: number) => {
	const _time = Math.ceil(time)
	let min: string | number = 0
	let sec: string | number = 0
	let hour: string | number = 0

	if (_time < 10) {
		return `00:0${_time}`
	}

	if (_time < 60) {
		return `00:${_time}`
	}

	min = Math.floor(_time / 60)
	sec = _time - min * 60
	if (min < 60) {
		if (min < 10) {
			min = '0' + min.toString()
		}
		if (sec < 10) {
			sec = '0' + sec.toString()
		}

		return `${min}:${sec}`
	}

	hour = Math.floor(min / 60)
	min = min - 60 * hour
	if (hour < 60) {
		if (hour < 10) {
			hour = '0' + hour.toString()
		}
		if (min < 10) {
			min = '0' + min.toString()
		}
		if (sec < 10) {
			sec = '0' + sec.toString()
		}
	}

	return `${hour}:${min}${sec}`
}
