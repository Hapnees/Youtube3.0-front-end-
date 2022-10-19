export const countCommentFormat = (value: number) => {
	if (value >= 11 && value <= 19) return 'комментариев'

	const strValue = value.toString()
	const last = strValue[strValue.length - 1]
	if (last === '1') return 'комментарий'
	if (parseInt(last) >= 2 && parseInt(last) <= 4) return 'комментария'
	return 'комментариев'
}
