import { IVideoGetVideoCard } from '../video/video-get-VideoCardinterface'

export interface IUserGetByUsername {
	id: number
	username: string
	email: string
	header_path: string
	avatar_path: string
	description: string
	is_subscribed: boolean | null
	video: IVideoGetVideoCard
}
