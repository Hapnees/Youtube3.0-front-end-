export const subscribersFormat = (value: number) => {
	if (value >= 11 && value <= 20) return 'подписчиков'

	const strValue = value.toString()
	const last = strValue[strValue.length - 1]
	if (last === '1') return 'подписчик'
	if (parseInt(last) >= 2 && parseInt(last) <= 4) return 'подписчика'
	return 'подписчиков'
}
