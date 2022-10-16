export const dateFormat = (date: string) => {
	const leftSide = date.split('T')[0]
	const year = leftSide.split('-')[0]
	const month = leftSide.split('-')[1]
	const day = leftSide.split('-')[2]

	const wordMonth = detMonth(parseInt(month))

	return `${day} ${wordMonth} ${year}г`
}

const detMonth = (month: number) => {
	switch (month) {
		case 1:
			return 'Янв'
		case 2:
			return 'Фев'
		case 3:
			return 'Март'
		case 4:
			return 'Апр'
		case 5:
			return 'Мая'
		case 6:
			return 'Июня'
		case 7:
			return 'Июля'
		case 8:
			return 'Авг'
		case 9:
			return 'Сент'
		case 10:
			return 'Окт'
		case 11:
			return 'Нояб'
		case 12:
			return 'Дек'
	}
}
