import React, { useEffect, useState } from 'react'
import cl from './ProfilePage.module.scss'
import profileIcon from '../../assets/img/profile.png'
import SubscribeButton from '../../components/ui/ProfileUI/SubscribeButton/SubscribeButton'
import { useNavigate } from 'react-router-dom'
import {
	useGetProfileQuery,
	useGetProfileVideosQuery,
} from '../../api/user.api'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import Loader from '../../components/ui/LoaderUI/Loader'
import VideoGridPlus from '../../components/ui/VideoGridUI/VideoGridPlus'

const ProfilePage = () => {
	const [radio, setRadio] = useState('video')
	const navigate = useNavigate()
	const { user } = useTypedSelector(state => state.auth)
	const { data: profileData, isLoading: isLoadingProfileData } =
		useGetProfileQuery(user.token || '')
	const { data: videoData, isLoading: isLoadingVideoData } =
		useGetProfileVideosQuery(user.token || '')

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
						<div className='flex flex-col gap-4 grow'>
							<div>
								<div className={cl.header}>
									<img
										src={profileData.header_path}
										alt=''
										className='h-full w-full object-cover border border-transparent'
									/>
								</div>
								<div className={cl.info}>
									<div className='flex flex-col h-full mx-20'>
										<div className='flex items-center justify-between grow'>
											<div className='flex items-center gap-4'>
												<img
													src={profileData.avatar_path || profileIcon}
													alt='profileIcon'
													className='rounded-full w-[70px] h-[70px]'
												/>
												<div>
													<p className='text-2xl mb-1'>
														{profileData.username}
													</p>
													<p className='text-zinc-400'>31 тыс. подписчиков</p>
												</div>
											</div>

											<div>
												<p className={cl.description}>
													{profileData.description}
												</p>
											</div>

											<SubscribeButton onClick={() => navigate('edit')}>
												Редактировать
											</SubscribeButton>
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
								<VideoGridPlus videos={videoData || []} />
							)}
						</div>
					)}
				</>
			)}
		</>
	)
}

export default ProfilePage
