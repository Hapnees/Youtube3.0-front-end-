import { IVideoGet } from '../video/video-get.interface'

export interface IUserGet {
	id: number
	username: string
	email: string
	description: string
	avatarPath: string
	headerPath: string
	videos: IVideoGet[]
}