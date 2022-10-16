import { IUserGetMini } from '../user/user-get-mini.interface'

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
	user: IUserGetMini
	createdAt: Date
}
