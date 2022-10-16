import { IUserGet } from '../user/user-get.interface'

export interface IVideoAdd {
	vid: number
	title: string
	description?: string
	thumbnailPath: string
	videoPath: string
	isPrivate: boolean
	duration: string
	user: IUserGet
}
