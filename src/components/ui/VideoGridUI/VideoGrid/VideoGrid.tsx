import React, { FC } from 'react'
import { IVideoGetVideoCard } from '../../../../models/video/video-get-VideoCardinterface'
import VideoCard from '../../../VideoCard/VideoCard'
import cl from './VideoGrid.module.scss'

interface IVideoGrid {
	videos: IVideoGetVideoCard[]
}

const VideoGrid: FC<IVideoGrid> = ({ videos }) => {
	return (
		<div className={cl.container}>
			{videos &&
				videos.map(video => <VideoCard key={video.id} video={video} />)}
		</div>
	)
}

export default VideoGrid
