export interface IVideoGetVideoPage {
  id: number
  vid: number
  title: string
  description?: string
  duration: string
  views: number
  likes: number
  dislikes: number
  thumbnail_path: string
  video_path: string
  created_at: Date
  user: {
    id: number
    username: string
    avatar_path: string
  }
  is_liked: boolean
  is_disliked: boolean
}
