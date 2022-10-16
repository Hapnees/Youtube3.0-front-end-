import React from 'react'
import VideoCard from '../../VideoCard/VideoCard'

const VideoGrid = () => {
	return (
		<div className='grid grid-cols-4 gap-4'>
			<VideoCard />
			<VideoCard />
			<VideoCard />
			<VideoCard />
			<VideoCard />
		</div>
	)
}

export default VideoGrid
