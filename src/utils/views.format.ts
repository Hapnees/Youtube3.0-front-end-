export const viewsFormat = (value: number) => {
	if (value >= 10 && value <= 20) return 'просмотров'

	const strValue = value.toString()
	const last = parseInt(strValue[strValue.length - 1])
	if (last === 1) return 'просмотр'
	if (last >= 2 && last <= 4) return 'просмотра'
	return 'просмотров'
}
