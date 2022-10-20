import React, { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
	useLazyGetVideosQuery,
	useLazySearchVideosQuery,
} from '../../api/user.api'
import Loader from '../../components/ui/LoaderUI/Loader'
import VideoGrid from '../../components/ui/VideoGridUI/VideoGrid'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'

const HomePage = () => {
	const { search } = useTypedSelector(state => state.input)
	const [searchParams, setSearchParams] = useSearchParams()
	const [getVideos, { data: videoData, isLoading: isLoadingVideoData }] =
		useLazyGetVideosQuery()
	const [
		searchVideos,
		{ data: searchedVideos, isLoading: isLoadingSearchedVideos },
	] = useLazySearchVideosQuery()

	// Поиск
	useEffect(() => {
		setSearchParams({ search })
		if (search) searchVideos(search)
		else {
			getVideos()
			setSearchParams()
		}
	}, [search])

	return (
		<div className='mt-4 w-full'>
			{isLoadingVideoData || isLoadingSearchedVideos ? (
				<Loader />
			) : (
				<>
					{searchParams.get('search') ? (
						searchedVideos?.length ? (
							<VideoGrid videos={searchedVideos} />
						) : (
							<p className='text-[30px]'>
								Видео по запросу <span className='text-red-400'>{search}</span>{' '}
								не найдены
							</p>
						)
					) : (
						videoData && <VideoGrid videos={videoData} />
					)}
				</>
			)}
		</div>
	)
}

export default HomePage
