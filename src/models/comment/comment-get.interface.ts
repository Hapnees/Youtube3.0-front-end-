export interface ICommentGet {
	id: number
	title: string
	created_at: Date
	likes: number
	dislikes: number
	user: { username: string; avatar_path: string }
}
