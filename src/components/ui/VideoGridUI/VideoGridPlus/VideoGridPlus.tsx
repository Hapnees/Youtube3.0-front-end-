import React, { FC } from 'react'
import { IVideoGetVideoCardPlus } from '../../../../models/video/vide-get-VideoCardPlus'
import VideoCardPlus from '../../../VideoCardPlus/VideoCardPlus'
import cl from './VideoGridPlus.module.scss'

interface IVideoGridPlus {
	videos: IVideoGetVideoCardPlus[]
}

const VideoGridPlus: FC<IVideoGridPlus> = ({ videos }) => {
	return (
		<div className={cl.container}>
			{videos &&
				videos.map(video => <VideoCardPlus key={video.id} video={video} />)}
		</div>
	)
}

export default VideoGridPlus
