import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  useLazyGetProfileByUsernameAuthQuery,
  useLazyGetProfileByUsernameQuery,
  useSubscribeMutation
} from '../../api/api.api'
import profileIcon from '../../assets/img/profile.png'
import Loader from '../../components/ui/LoaderUI/Loader'
/* import SubscribeButton from '../../components/ui/ProfileUI/SubscribeButton/SubscribeButton' */
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { numberFormat } from '../../utils/number.format'
import cl from './ProfileByUsernamePage.module.scss'
import { subscribersFormat } from '../../utils/subscribers.format'
import { IUserGetByUsername } from '../../models/user/user-get-byusername.interface'
import { useLazyGetProfileVideosByUsernameQuery } from '../../api/video.api'
import { IVideoCard } from '../../models/video/video-get-VideoCard.interface'
import VideoCard from '../../components/VideoCard/VideoCard'

const ProfileByUsernamePage = () => {
  const {
    user: { token, id }
  } = useTypedSelector(state => state.auth)
  const [subscribe] = useSubscribeMutation()
  const [radio, setRadio] = useState('video')
  const params: any = useParams()
  const [profileUserData, setProfileUserData] = useState<
    IUserGetByUsername | Omit<IUserGetByUsername, 'is_subscribed'>
  >()
  const [getProfileByUsername] = useLazyGetProfileByUsernameQuery()
  const [getProfileAuth] = useLazyGetProfileByUsernameAuthQuery()
  const [getVideos, { isLoading: isLoadingVideos }] =
    useLazyGetProfileVideosByUsernameQuery()

  const [videos, setVideos] = useState<IVideoCard[]>([])

  // Фетч данных пользователя
  useEffect(() => {
    if (token?.length) {
      getProfileAuth({ username: params.username, token })
        .unwrap()
        .then(data => {
          setProfileUserData(data)
        })
    } else {
      getProfileByUsername(params.username)
        .unwrap()
        .then(data => {
          setProfileUserData(data)
        })
    }
  }, [token, params.username])

  //Фетч данных видео
  useEffect(() => {
    if (profileUserData) {
      getVideos(params.username)
        .unwrap()
        .then(videoData => {
          const data = videoData.map(video => ({
            ...video,
            user: {
              username: profileUserData.username,
              avatar_path: profileUserData.avatar_path
            }
          }))
          setVideos(data)
        })
    }
  }, [profileUserData])

  return (
    <>
      {!profileUserData ? (
        <Loader />
      ) : (
        <div className='flex flex-col gap-4 grow'>
          <div>
            <div className={cl.header}>
              <img
                src={profileUserData?.header_path}
                alt=''
                className='h-full w-full object-cover border border-transparent'
              />
            </div>
            <div className={cl.info}>
              <div className='flex flex-col h-full mx-20'>
                <div className='flex items-center justify-between grow'>
                  <div className='flex items-center gap-4'>
                    <img
                      src={profileUserData?.avatar_path || profileIcon}
                      alt='profileIcon'
                      width={78}
                      className={cl.avatar}
                    />
                    <div>
                      <p className='text-2xl'>{profileUserData?.username}</p>
                      <div className='flex gap-1 text-zinc-400'>
                        <p>
                          {numberFormat(
                            profileUserData?.subscribers_count || 0
                          )}
                        </p>
                        <p>
                          {subscribersFormat(
                            profileUserData?.subscribers_count || 0
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className={cl.description}>
                      {profileUserData?.description}
                    </p>
                  </div>

                  {/* {token ? (
                    id !== profileUserData.id &&
                    (!videoData?.is_subscribed ? (
                      <SubscribeButton
                        onClick={() =>
                          subscribe({
                            userId: videoData?.user.id || 0,
                            token: user.token || ''
                          })
                        }
                      >
                        Подписаться
                      </SubscribeButton>
                    ) : (
                      <button
                        className='text-zinc-400 bg-zinc-800 px-4 py-2 uppercase self-center rounded-md hover:bg-zinc-900 duration-300'
                        onClick={() =>
                          subscribe({
                            userId: videoData?.user.id || 0,
                            token: user.token || ''
                          })
                        }
                      >
                        вы подписаны
                      </button>
                    ))
                  ) : (
                    <SubscribeButton
                      onClick={() =>
                        toast.info('Войдите, чтобы подписаться', toastConfig)
                      }
                    >
                      Подписаться
                    </SubscribeButton>
                  )} */}
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
          {isLoadingVideos ? (
            <Loader />
          ) : (
            <div className='w-full'>
              <div className='grid'>
                {videos &&
                  videos.map(video => (
                    <VideoCard key={video.id} video={video} />
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default ProfileByUsernamePage
