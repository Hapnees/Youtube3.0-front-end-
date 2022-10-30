import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useLazySearchUsersQuery } from '../../api/user.api'
import { useLazyGetVideosQuery } from '../../api/video.api'
import UserCard from '../../components/ui/UserCardUi/UserCard'
import VideoCard from '../../components/VideoCard/VideoCard'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { IUserGetSearch } from '../../models/user/user-get-search.interface'
import { IVideoCard } from '../../models/video/video-get-VideoCard.interface'
import cl from './HomePage.module.scss'

const HomePage = () => {
  const [isFetching, setIsFetching] = useState(true)

  const isMounted = useRef(false)

  const [searchParams, setSearchParams] = useSearchParams()

  const { category } = useTypedSelector(state => state.mainMenuCategories)
  const { search } = useTypedSelector(state => state.input)
  const { setSearch, setCategory } = useActions()

  const [compareCategory, setCompareCategory] = useState(category)
  const [compareSearch, setCompareSearch] = useState(
    searchParams.get('search') || ''
  )

  const [currentPageVideo, setCurrentPageVideo] = useState(1)
  const [totalCountVideo, setTotalCountVideo] = useState(0)

  const [currentPageUser, setCurrentPageUser] = useState(1)
  const [totalCountUser, setTotalCountUser] = useState(0)

  const [videos, setVideos] = useState<IVideoCard[]>([])
  const [users, setUsers] = useState<IUserGetSearch[]>([])

  const [getVideos] = useLazyGetVideosQuery()
  const [getUsers] = useLazySearchUsersQuery()

  useEffect(() => {
    setSearch(searchParams.get('search') || '')
  }, [])

  // Поиск
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      return
    }

    if (search) {
      setSearchParams({ search })
      setCategory('search')
    } else {
      setSearchParams()
      setCategory('general')
    }
  }, [search])

  // Фетч
  useEffect(() => {
    const searchParamsValue = searchParams.get('search') || ''
    if (compareCategory !== category || compareSearch !== searchParamsValue) {
      setIsFetching(true)
      setVideos([])
      setUsers([])
      setCurrentPageVideo(1)
      setCurrentPageUser(1)
      setTotalCountVideo(0)
      setTotalCountUser(0)
      if (category !== 'search') {
        setSearch('')
      }
    }

    if (!isFetching) return
    getVideos({
      page: currentPageVideo,
      category,
      search: searchParamsValue
    })
      .unwrap()
      .then(videoData => {
        setVideos(prev => [...prev, ...videoData.videos])
        setCurrentPageVideo(prev => prev + 1)
        setTotalCountVideo(videoData.total_count)
        if (category === 'search') {
          getUsers({ username: searchParamsValue })
            .unwrap()
            .then(userData => {
              setUsers(prev => [...prev, ...userData.users])
              setCurrentPageUser(prev => prev + 1)
              setTotalCountUser(userData.total_count)
            })
        }
      })
      .finally(() => {
        setIsFetching(false)
        setCompareCategory(category)
        setCompareSearch(searchParamsValue)
      })
  }, [isFetching, category, currentPageVideo, searchParams, currentPageUser])

  // Скролл
  useEffect(() => {
    document.addEventListener('scroll', handleScroll)

    return () => document.removeEventListener('scroll', handleScroll)
  }, [videos, users])

  const handleScroll = (event: any) => {
    const docElement = event.target.documentElement
    if (
      docElement.scrollHeight - (docElement.scrollTop + window.innerHeight) <
        100 &&
      videos.length + users.length < totalCountVideo + totalCountUser
    ) {
      /* console.log('length -> ', videos.length) */
      /* console.log('totalCount -> ', totalCount) */
      /* console.log('currentPage -> ', currentPage) */
      setIsFetching(true)
    }
  }

  return (
    <div>
      <div className={cl.grid}>
        <>
          {videos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </>
        <>
          {users.map(user => (
            <UserCard key={user.username} user={user} />
          ))}
        </>
      </div>
    </div>
  )
}

export default HomePage
