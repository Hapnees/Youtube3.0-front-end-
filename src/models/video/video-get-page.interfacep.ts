import { IUserGet } from '../user/user-get.interface'

export interface IVideoGetPage {
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
	createdAt: Date
	user: IUserGet
}
