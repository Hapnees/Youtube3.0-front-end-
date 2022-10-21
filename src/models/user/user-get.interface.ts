import { IVideoGetVideoCardPlus } from '../video/vide-get-VideoCardPlus'

export interface IUserGet {
	id: number
	username: string
	email: string
	description: string
	avatar_path: string
	header_path: string
	subscribers_count: number
	// videos: IVideoGetVideoCardPlus[]
}
