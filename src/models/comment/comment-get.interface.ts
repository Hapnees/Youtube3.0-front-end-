export interface ICommentGet {
	id: number
	title: string
	created_at: Date
	likes: { count: number; ids: number[] }
	dislikes: { count: number; ids: number[] }
	user: { username: string; avatar_path: string }
}
