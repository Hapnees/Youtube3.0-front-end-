import React, { FC } from 'react'
import { IVideoGetVideoCard } from '../../../models/video/video-get-VideoCardinterface'
import VideoCard from '../../VideoCard/VideoCard'

interface IVideoGrid {
	videos: IVideoGetVideoCard[]
}

const VideoGrid: FC<IVideoGrid> = ({ videos }) => {
	return (
		<div className='grid grid-cols-4 gap-4'>
			{videos &&
				videos.map(video => <VideoCard key={video.id} video={video} />)}
		</div>
	)
}

export default VideoGrid
