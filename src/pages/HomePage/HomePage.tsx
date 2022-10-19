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
	const { setSearch } = useActions()
	const isMounted = useRef(false)
	const [searchParams, setSearchParams] = useSearchParams()
	const [getVideos, { data: videoData, isLoading: isLoadingVideoData }] =
		useLazyGetVideosQuery()
	const [
		searchVideos,
		{ data: searchedVideos, isLoading: isLoadingSearchedVideos },
	] = useLazySearchVideosQuery()

	useEffect(() => {
		const _value = searchParams.get('search')
		if (_value) {
			setSearch(_value)
		} else {
			getVideos()
		}
	}, [])

	useEffect(() => {
		if (search) {
			setSearchParams({ search })
			searchVideos(search)
		} else {
			if (isMounted.current) getVideos()
			isMounted.current = true
		}
	}, [search])

	return (
		<div className='mt-4 w-full'>
			{isLoadingSearchedVideos || isLoadingVideoData ? (
				<Loader />
			) : searchedVideos ? (
				searchedVideos.length ? (
					<VideoGrid videosHomePage={searchedVideos} />
				) : searchParams.get('search') ? (
					<div className='flex gap-1 text-3xl mt-10 ml-10'>
						<p>Видео по запросу </p>
						<p className='text-red-400'>{searchParams.get('search')}</p>
						<p>не найдены</p>
					</div>
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
