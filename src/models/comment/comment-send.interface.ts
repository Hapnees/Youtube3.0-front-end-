import { IAuthSlice } from '../auth/auth.interface'
import { IVideoGetVideoPage } from '../video/video-get-page.interface'

export interface ICommentSend {
	title: string
	user: Omit<IAuthSlice, 'token'>
	video: IVideoGetVideoPage
}
