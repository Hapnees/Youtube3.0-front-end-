import React, { useEffect } from 'react'
import cl from './ProfilePage.module.scss'
import profileIcon from '../../assets/img/profile.png'
import SubscribeButton from '../../components/ui/ProfileUI/SubscribeButton/SubscribeButton'
import { useNavigate } from 'react-router-dom'
import { useGetProfileQuery } from '../../api/user.api'
import { useTypedSelector } from '../../hooks/useTypedSelector'

const ProfilePage = () => {
	const navigate = useNavigate()
	const {
		user: { token },
	} = useTypedSelector(state => state.auth)
	const { data: profileData } = useGetProfileQuery(token || '')

	// Проверка на токен
	useEffect(() => {
		if (!token) {
			setTimeout(() => {
				navigate('/')
			}, 2000)
		}
	}, [token])

	return (
		<div className='grow'>
			<div className={cl.header}></div>

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

						<div className='h-[3.9em] flex items-center'>
							<p className='text-zinc-400 w-[600px] leading-[1.3em] tracking-wide overflow-hidden'>
								{profileData?.description}
							</p>
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
	)
}

export default ProfilePage
