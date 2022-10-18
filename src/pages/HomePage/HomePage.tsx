import React, { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useGetVideosQuery, useLazySearchVideosQuery } from '../../api/user.api'
import Loader from '../../components/ui/LoaderUI/Loader'
import VideoGrid from '../../components/ui/VideoGridUI/VideoGrid'
import { useTypedSelector } from '../../hooks/useTypedSelector'

const HomePage = () => {
	const isMounted = useRef(false)
	const [searchParams] = useSearchParams()
	const { data: videoData, isLoading: isLoadingVideoData } = useGetVideosQuery()
	const [
		searchVideos,
		{ data: searchedVideos, isLoading: isLoadingSearchedVideos },
	] = useLazySearchVideosQuery()

	useEffect(() => {
		const value = searchParams.get('search')
		if (isMounted.current || value) searchVideos(value || '')
		isMounted.current = true
	}, [searchParams.get('search')])

	return (
		<div className='mt-4'>
			{isLoadingSearchedVideos || isLoadingVideoData ? (
				<Loader />
			) : searchedVideos ? (
				searchedVideos.length ? (
					<VideoGrid videosHomePage={searchedVideos} />
				) : searchParams.get('search') ? (
					<p>{`Видео по запросу "${searchParams.get('search')}" не найдены`}</p>
				) : (
					!!videoData && <VideoGrid videosHomePage={videoData} />
				)
			) : (
				!!videoData && <VideoGrid videosHomePage={videoData} />
			)}
		</div>
	)
}

export default HomePage
