export interface IVideoGetVideoCard {
	id: number
	title: string
	description?: string
	duration: string
	views: number
	thumbnail_path: string
	video_path: string
	created_at: Date
	user: { username: string; avatar_path: string }
}
