export const numberFormat = (value: number) => {
	if (value >= 1_000_000_000_000) {
		return 'Очень много'
	} else if (value >= 1_000_000_000) {
		const temp = Math.ceil(value / 1_000_000_000)
		return `${value} млрд`
	} else if (value >= 1_000_000) {
		const temp = Math.ceil(value / 1_000_000)
		return `${value} млн`
	} else if (value >= 1_000) {
		const temp = Math.ceil(value / 1_000)
		return `${value} тыс`
	} else {
		return value
	}
}
