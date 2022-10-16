import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProfileByUsernameQuery } from '../../api/user.api'
import profileIcon from '../../assets/img/profile.png'
import SubscribeButton from '../../components/ui/ProfileUI/SubscribeButton/SubscribeButton'
import VideoGrid from '../../components/ui/VideoGridUI/VideoGrid'
import cl from './ProfileByUsernamePage.module.scss'

const ProfileByUsernamePage = () => {
	const params: any = useParams()
	const { data: profileData } = useGetProfileByUsernameQuery(params.username)
	return (
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

							<SubscribeButton>Подписаться</SubscribeButton>
						</div>
						<ul className={cl.menu}>
							<li>Видео</li>
							<li>Плейлисты</li>
							<li>О канале</li>
						</ul>
					</div>
				</div>
			</div>
			{!!profileData && (
				<VideoGrid videos={profileData?.videos || []} user={profileData} />
			)}
		</div>
	)
}

export default ProfileByUsernamePage
