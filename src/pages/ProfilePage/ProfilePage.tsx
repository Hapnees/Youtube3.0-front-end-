import React, { useEffect, useMemo, useState } from 'react'
import cl from './ProfilePage.module.scss'
import profileIcon from '../../assets/img/profile.png'
import SubscribeButton from '../../components/ui/ProfileUI/SubscribeButton/SubscribeButton'
import { useNavigate } from 'react-router-dom'
import { useGetProfileQuery } from '../../api/api.api'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import Loader from '../../components/ui/LoaderUI/Loader'
import { numberFormat } from '../../utils/number.format'
import { subscribersFormat } from '../../utils/subscribers.format'
import { useGetProfileVideosQuery } from '../../api/video.api'
import VideoCard from '../../components/VideoCard/VideoCard'

const ProfilePage = () => {
  const [radio, setRadio] = useState('video')
  const navigate = useNavigate()
  const { user } = useTypedSelector(state => state.auth)
  const { data: profileData, isLoading: isLoadingProfileData } =
    useGetProfileQuery(user.token || '')
  const { data: videoData, isLoading: isLoadingVideoData } =
    useGetProfileVideosQuery(user.token || '')

  const resultVideos = useMemo(() => {
    if (videoData)
      return videoData.map(video => ({
        ...video,
        user: { username: user.username, avatar_path: user.avatarPath || '' }
      }))
    return []
  }, [videoData])

  // Проверка на токен
  useEffect(() => {
    if (!user.token) {
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
  }, [user.token])

  return (
    <>
      {isLoadingProfileData ? (
        <Loader />
      ) : (
        <>
          {profileData && (
            <div className='flex flex-col gap-4 w-full'>
              <div>
                <div className={cl.header}>
                  <img
                    src={profileData.header_path}
                    alt=''
                    className='h-full w-full object-cover border border-transparent'
                  />
                </div>
                <div className={cl.info}>
                  <div className={cl.info__box}>
                    <div className='grow flex justify-center items-center'>
                      <div className={cl.info__body}>
                        <div className='flex items-center gap-4'>
                          <img
                            src={profileData.avatar_path || profileIcon}
                            alt='profileIcon'
                            className={cl.avatar}
                          />
                          <div>
                            <div className='flex flex-col'>
                              <p className='text-2xl'>{profileData.username}</p>
                              <div className={cl.subscribers_count}>
                                <p>
                                  {numberFormat(
                                    profileData.subscribers_count || 0
                                  )}
                                </p>
                                <p>
                                  {subscribersFormat(
                                    profileData.subscribers_count || 0
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='grow border-red-600'>
                          <p className={cl.description}>
                            {profileData.description}
                          </p>
                        </div>

                        <SubscribeButton onClick={() => navigate('edit')}>
                          Редактировать
                        </SubscribeButton>
                      </div>
                    </div>

                    <div className={cl.menu}>
                      <input
                        type='radio'
                        name='profile'
                        value='video'
                        id='video'
                        checked={radio === 'video'}
                        onChange={() => setRadio('video')}
                      />
                      <label htmlFor='video'>Видео</label>
                      <input
                        type='radio'
                        name='profile'
                        value='playlist'
                        id='playlist'
                        checked={radio === 'playlist'}
                        onChange={() => setRadio('playlist')}
                      />
                      <label htmlFor='playlist'>Плейлисты</label>
                      <input
                        type='radio'
                        name='profile'
                        value='about'
                        id='about'
                        checked={radio === 'about'}
                        onChange={() => setRadio('about')}
                      />
                      <label htmlFor='about'>О канале</label>
                    </div>
                  </div>
                </div>
              </div>

              {isLoadingVideoData ? (
                <Loader />
              ) : (
                <div className='w-full'>
                  <div className={cl.grid}>
                    {resultVideos &&
                      resultVideos.map(video => (
                        <VideoCard key={video.id} video={video} />
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  )
}

export default ProfilePage
