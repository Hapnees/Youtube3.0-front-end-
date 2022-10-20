export interface IVideoGet {
	id: number
	vid: number
	title: string
	description?: string
	duration: string
	views: number
	likes: number
	dislikes: number
	isPrivate: boolean
	thumbnailPath: string
	videoPath: string
	user_id: number
	createdAt: Date
}
