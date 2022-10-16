import React from 'react'
import { useGetVideosQuery } from '../../api/video.api'
import VideoGrid from '../../components/ui/VideoGridUI/VideoGrid'

const HomePage = () => {
	const { data: videoData } = useGetVideosQuery()
	return (
		<div className='mt-4'>
			{!!videoData && <VideoGrid videosHomePage={videoData} />}
		</div>
	)
}

export default HomePage
