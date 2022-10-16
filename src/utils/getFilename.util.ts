// Получить название видео без расширения

export const getFilename = (filename: string) => {
	const name = filename.split('.')

	return name.splice(0, name.length - 1).join('.')
}
