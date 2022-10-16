import React, { useEffect } from 'react'
import cl from './ProfilePage.module.scss'
import profileIcon from '../../assets/img/profile.png'
import SubscribeButton from '../../components/ui/ProfileUI/SubscribeButton/SubscribeButton'
import { useNavigate } from 'react-router-dom'
import { useGetProfileQuery } from '../../api/user.api'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import VideoGrid from '../../components/ui/VideoGridUI/VideoGrid'
import Loader from '../../components/ui/LoaderUI/Loader'

const ProfilePage = () => {
	const navigate = useNavigate()
	const { user } = useTypedSelector(state => state.auth)
	const { data: profileData, isLoading: isLoadingProfileData } =
		useGetProfileQuery(user.token || '')

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
				<div className='flex flex-col gap-4 grow'>
					<div>
						<div className={cl.header}>
							<img
								src={profileData?.headerPath}
								alt=''
								className='h-full w-full object-cover'
							/>
						</div>
						<div className={cl.info}>
							<div className='flex flex-col h-full mx-20'>
								<div className='flex items-center justify-between grow'>
									<div className='flex items-center gap-4'>
										<img
											src={profileData?.avatarPath || profileIcon}
											alt='profileIcon'
											width={70}
											className='rounded-full'
										/>
										<div>
											<p className='text-2xl'>
												{profileData?.username || 'username'}
											</p>
											<p className='text-zinc-400'>31 тыс. подписчиков</p>
										</div>
									</div>

									<div>
										<p className={cl.description}>{profileData?.description}</p>
									</div>

									<SubscribeButton onClick={() => navigate('edit')}>
										Редактировать
									</SubscribeButton>
								</div>
								<ul className={cl.menu}>
									<li>Видео</li>
									<li>Плейлисты</li>
									<li>О канале</li>
								</ul>
							</div>
						</div>
					</div>
					<VideoGrid videos={profileData?.videos || []} user={user} />
				</div>
			)}
		</>
	)
}

export default ProfilePage
