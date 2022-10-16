export interface IVideoGet {
	id: number
	vid: number
	title: string
	description?: string
	duration: string
	views: number
	likes: number
	dislikes: number
	thumbnailPath: string
	videoPath: string
}
