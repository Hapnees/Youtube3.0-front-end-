import React, { FC } from 'react'
import { IVideoGetVideoCardPlus } from '../../../../models/video/vide-get-VideoCardPlus'
import VideoCardMini from '../../../VideoCardMini/VideoCardMini'
import cl from './VideoGridMini.module.scss'

interface IVideoGridPlus {
	videos: IVideoGetVideoCardPlus[]
	user: { username: string; avatar_path: string }
}

const VideoGridMini: FC<IVideoGridPlus> = ({ videos, user }) => {
	return (
		<div className={cl.container}>
			{videos &&
				videos.map(video => (
					<VideoCardMini key={video.id} video={video} user={user} />
				))}
		</div>
	)
}

export default VideoGridMini
