import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
	useLazyGetLikeVideosQuery,
	useLazyGetVideosQuery,
	useLazySearchUsersQuery,
} from '../../api/user.api'
import Loader from '../../components/ui/LoaderUI/Loader'
import UserCard from '../../components/ui/UserCardUi/UserCard'
import VideoGrid from '../../components/ui/VideoGridUI/VideoGrid/VideoGrid'
import { toastConfig } from '../../config/toast.config'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { IVideoGetVideoCard } from '../../models/video/video-get-VideoCardinterface'
import cl from './HomePage.module.scss'

const HomePage = () => {
	const limit = 12

	const { user } = useTypedSelector(state => state.auth)
	const [isFetching, setIsFetching] = useState(true)
	const [videos, setVideos] = useState<IVideoGetVideoCard[]>([])
	const [currentPage, setCurrentPage] = useState(1)

	const [totalPages, setTotalPages] = useState(0)

	const [
		searchUsers,
		{ data: searchedUsers, isLoading: isLoadingSearchedUsers },
	] = useLazySearchUsersQuery()

	const { setCategory } = useActions()
	const { category } = useTypedSelector(state => state.mainMenuCategories)
	const { search } = useTypedSelector(state => state.input)
	const [searchParams, setSearchParams] = useSearchParams()
	const [getVideos, { isLoading: isLoadingVideos }] = useLazyGetVideosQuery()
	const [getLikedVideos, { isLoading: isLoadingLikedVideos }] =
		useLazyGetLikeVideosQuery()

	const [comapreCategory, setCompareCategory] = useState(category)
	const [comapreSearch, setCompareSearch] = useState(searchParams.get('search'))

	useEffect(() => {
		document.addEventListener('scroll', handleScroll)

		return () => document.removeEventListener('scroll', handleScroll)
	}, [])

	// Поиск
	useEffect(() => {
		if (search) {
			setSearchParams({ search })
		} else {
			setSearchParams()
			setCategory('general')
		}
	}, [search])

	// Фетч данных
	useEffect(() => {
		if (category !== comapreCategory) {
			// console.log('isChangedCategory')
			setIsFetching(true)
			setVideos([])
			setCurrentPage(1)
		}

		if (searchParams.get('search') !== comapreSearch) {
			setIsFetching(true)
			setVideos([])
			setCurrentPage(1)
		}

		// console.log(isFetching)
		// console.log('currentPage -> ', currentPage)
		// console.log('totalPages -> ', totalPages)

		if (isFetching && (currentPage <= totalPages || totalPages === 0)) {
			if (category === 'liked') {
				if (user.token) {
					getLikedVideos({ limit, page: currentPage, token: user.token })
						.unwrap()
						.then(data => {
							setVideos(prev => [...prev, ...data.videos])
							setTotalPages(data.total_pages)
							setIsFetching(false)
						})
						.finally(() => {
							setCurrentPage(prev => prev + 1)
							setCompareCategory(category)
						})
				} else {
					toast.error('Сначала войдите в аккаунт', toastConfig)
				}
			} else {
				getVideos({
					limit,
					page: currentPage,
					category,
					search: searchParams.get('search') || '',
				})
					.unwrap()
					.then(data => {
						setVideos(prev => [...prev, ...data.videos])
						setTotalPages(data.total_pages)
						setIsFetching(false)
					})
					.finally(() => {
						setCurrentPage(prev => prev + 1)
						setCompareCategory(category)
					})
			}
		}

		setCompareSearch(searchParams.get('search'))
	}, [isFetching, category, currentPage, searchParams.get('search')])

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
			{isLoadingVideos ? (
				<Loader />
			) : (
				<>{videos && <VideoGrid videos={videos} />}</>
			)}
		</div>
	)
}

export default HomePage
