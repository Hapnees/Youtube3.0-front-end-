import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProfileByUsernameQuery } from '../../api/user.api'
import profileIcon from '../../assets/img/profile.png'
import SubscribeButton from '../../components/ui/ProfileUI/SubscribeButton/SubscribeButton'
import VideoGrid from '../../components/ui/VideoGridUI/VideoGrid'
import cl from './ProfileByUsernamePage.module.scss'

const ProfileByUsernamePage = () => {
	const [radio, setRadio] = useState('video')
	const params: any = useParams()
	const { data: profileData } = useGetProfileByUsernameQuery(params.username)

	return (
		<div className='flex flex-col gap-4 grow'>
			<div>
				<div className={cl.header}>
					<img
						src={profileData?.header_path}
						alt=''
						className='h-full w-full object-cover border border-transparent'
					/>
				</div>
				<div className={cl.info}>
					<div className='flex flex-col h-full mx-20'>
						<div className='flex items-center justify-between grow'>
							<div className='flex items-center gap-4'>
								<img
									src={profileData?.avatar_path || profileIcon}
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
			{/* {!!profileData && (

			)} */}
		</div>
	)
}

export default ProfileByUsernamePage
