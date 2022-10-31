import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useLazySearchUsersQuery } from '../../api/api.api'
import { useLazyGetVideosQuery } from '../../api/video.api'
import Loader from '../../components/ui/LoaderUI/Loader'
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
      setIsFetching(true)
    }
  }

  return (
    <div className='w-full'>
      {isFetching ? (
        <Loader />
      ) : (
        <>
          {!videos.length && !users.length ? (
            <div className='mt-12 ml-12 text-[40px]'>
              {category === 'search' ? (
                <p>
                  Материалы по запросу <span>{searchParams.get('search')}</span>{' '}
                  не найдены
                </p>
              ) : (
                <p>Материалы отсутствуют</p>
              )}
            </div>
          ) : (
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
          )}
        </>
      )}
    </div>
  )
}

export default HomePage
