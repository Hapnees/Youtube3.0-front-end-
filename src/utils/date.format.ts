export const dateFormat = (date: Date) => {
	const defect = 3 // "ПОГРЕШНОСТЬ" во времени
	const strDateNow = new Date().toString()
	const infoNow = strDateNow.split(' ')

	const monthNow: number = detMonth(infoNow[1])
	const dayNow = parseInt(infoNow[2])
	const yearNow = parseInt(infoNow[3])
	const timeNow = infoNow[4]

	const strDate = date.toString()
	const infoLeft = strDate.split('T')[0]

	const year = parseInt(infoLeft.split('-')[0])
	const month = parseInt(infoLeft.split('-')[1])
	const day = parseInt(infoLeft.split('-')[2])
	const time = strDate.split('T')[1].split('.')[0]

	if (yearNow > year) {
		const diff = yearNow - year
		let word: string
		if (diff >= 10 && diff <= 20) word = 'лет'
		else {
			const temp = parseInt(diff.toString()[diff.toString().length - 1])
			if (temp === 1) word = 'год'
			else if (temp >= 2 && temp <= 4) word = 'года'
			else word = 'лет'
		}

		return `${diff} ${word} назад`
	} else if (monthNow > month) {
		const diff = monthNow - month
		let word: string
		if (diff === 1) word = 'месяц'
		else if (diff >= 2 && diff <= 4) word = 'месяца'
		else word = 'месяцев'

		return `${diff} ${word} назад`
	} else if (dayNow > day) {
		const diff = dayNow - day
		let word: string
		if (diff >= 10 && diff <= 20) word = 'дней'
		else {
			const temp = parseInt(diff.toString()[diff.toString().length - 1])
			if (temp === 1) word = 'день'
			else if (temp >= 2 && temp <= 4) word = 'дня'
			else word = 'дней'
		}

		return `${diff} ${word} назад`
	} else {
		const hourNow = parseInt(timeNow.split(':')[0])
		const hour = parseInt(time.split(':')[0]) + defect

		if (hourNow > hour) {
			const diff = hourNow - hour
			let word: string
			if (diff >= 10 && diff >= 20) word = 'часов'
			else {
				const temp = parseInt(diff.toString()[diff.toString().length - 1])
				if (temp === 1 && diff !== 11) word = 'час'
				else if (temp >= 2 && temp <= 4) word = 'часа'
				else word = 'часов'
			}
			return `${diff} ${word} назад`
		} else {
			return 'Только что'
		}
	}
}

const detMonth = (month: string) => {
	switch (month) {
		case 'Jan':
			return 1
		case 'Feb':
			return 2
		case 'Mar':
			return 3
		case 'Apr':
			return 4
		case 'May':
			return 5
		case 'Jun':
			return 6
		case 'Jul':
			return 7
		case 'Aug':
			return 8
		case 'Sep':
			return 9
		case 'Oct':
			return 10
		case 'Nov':
			return 11
		case 'Dec':
			return 12
		default:
			return 0
	}
}
