import React, { FC } from 'react'
import { IVideoGetVideoCardPlus } from '../../../models/video/vide-get-VideoCardPlus'
import VideoCardPlus from '../../VideoCardPlus/VideoCardPlus'

interface IVideoGridPlus {
	videos: IVideoGetVideoCardPlus[]
}

const VideoGridPlus: FC<IVideoGridPlus> = ({ videos }) => {
	return (
		<div className='grid grid-cols-4 gap-4'>
			{videos &&
				videos.map(video => <VideoCardPlus key={video.id} video={video} />)}
		</div>
	)
}

export default VideoGridPlus
