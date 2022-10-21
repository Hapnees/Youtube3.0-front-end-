import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
	useLazyGetVideosQuery,
	useLazyGetVideosTrendsQuery,
	useLazySearchUsersQuery,
	useLazySearchVideosQuery,
} from '../../api/user.api'
import Loader from '../../components/ui/LoaderUI/Loader'
import UserCard from '../../components/ui/UserCardUi/UserCard'
import VideoGrid from '../../components/ui/VideoGridUI/VideoGrid/VideoGrid'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { IVideoGetVideoCard } from '../../models/video/video-get-VideoCardinterface'
import cl from './HomePage.module.scss'

const HomePage = () => {
	const limit = 12

	const [isFetching, setIsFetching] = useState(true)
	const [videos, setVideos] = useState<IVideoGetVideoCard[]>([])
	const [currentPage, setCurrentPage] = useState(1)

	const [isFetchingTrend, setIsFetchingTrend] = useState(true)
	const [trendVideos, setTrendVideos] = useState<IVideoGetVideoCard[]>([])
	const [currentPageTrends, setCurrentPageTrends] = useState(1)

	const [isFetchingSearched, setIsFetchingSearch] = useState(true)
	const [searchedVideos, setSearchedVideos] = useState<IVideoGetVideoCard[]>([])
	const [currentPageSearched, setCurrentPageSearched] = useState(1)

	const [totalPages, setTotalPages] = useState(0)

	const [
		searchUsers,
		{ data: searchedUsers, isLoading: isLoadingSearchedUsers },
	] = useLazySearchUsersQuery()
	const [getVideosTrends, { isLoading: isLoadingTrendVideos }] =
		useLazyGetVideosTrendsQuery()
	const { category } = useTypedSelector(state => state.mainMenuCategories)
	const { search } = useTypedSelector(state => state.input)
	const [searchParams, setSearchParams] = useSearchParams()
	const [getVideos, { isLoading: isLoadingVideoData }] = useLazyGetVideosQuery()
	const [searchVideos, { isLoading: isLoadingSearchedVideos }] =
		useLazySearchVideosQuery()

	useEffect(() => {
		document.addEventListener('scroll', handleScroll)

		return () => document.removeEventListener('scroll', handleScroll)
	}, [])

	// Поиск
	useEffect(() => {
		if (category === 'trends') {
			if (currentPageTrends <= totalPages || totalPages === 0) {
				getVideosTrends({ limit, page: currentPageTrends })
					.unwrap()
					.then(data => {
						setTrendVideos(prev => [...prev, ...data.videos])
						setTotalPages(data.total_pages)
					})
				setCurrentPageTrends(prev => prev + 1)
			}
		} else if (category === 'general') {
			setSearchParams({ search })
			if (search && (currentPageSearched <= totalPages || totalPages === 0)) {
				searchVideos(search)
					.unwrap()
					.then(data => {
						setSearchedVideos(prev => [...prev, ...data.videos])
						setTotalPages(data.total_pages)
					})
				setCurrentPageSearched(prev => prev + 1)
				searchUsers(search)
			} else {
				if (currentPage <= totalPages || totalPages === 0) {
					getVideos({ limit, page: currentPage })
						.unwrap()
						.then(data => {
							setVideos(prev => [...prev, ...data.videos])
							setTotalPages(data.total_pages)
						})
					setCurrentPage(prev => prev + 1)
				}
				setSearchParams()
			}
		}
	}, [search, category, isFetching])

	const handleScroll = (event: any) => {
		const docElement = event.target.documentElement
		if (
			docElement.scrollHeight - (docElement.scrollTop + window.innerHeight) <
			100
		) {
			setIsFetching(true)
		}
	}

	return (
		<div className='mt-4 w-full'>
			{isLoadingVideoData ||
			isLoadingSearchedVideos ||
			isLoadingTrendVideos ||
			isLoadingSearchedUsers ? (
				<Loader />
			) : (
				<div className='inline-flex'>
					<>
						{trendVideos?.length && category === 'trends' ? (
							<VideoGrid videos={trendVideos} />
						) : searchParams.get('search') ? (
							!!searchVideos?.length && <VideoGrid videos={searchedVideos} />
						) : (
							videos.length && <VideoGrid videos={videos} />
						)}
					</>
					<div className={cl.usergrid}>
						{searchedUsers &&
							searchParams.get('search') &&
							searchedUsers.map(user => (
								<UserCard key={user.username} user={user} />
							))}
					</div>
					<div>
						{searchParams.get('search') &&
							!searchUsers.length &&
							!searchVideos.length && (
								<p className='text-[35px]'>
									Материалы по запросу{' '}
									<span className='text-red-400'>{search}</span> не найдены
								</p>
							)}
					</div>
				</div>
			)}
		</div>
	)
}

export default HomePage
