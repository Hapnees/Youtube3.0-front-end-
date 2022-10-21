import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
	useGetProfileVideosByUsernameQuery,
	useLazyGetProfileByUsernameAuthQuery,
	useLazyGetProfileByUsernameQuery,
	useSubscribeMutation,
} from '../../api/user.api'
import profileIcon from '../../assets/img/profile.png'
import Loader from '../../components/ui/LoaderUI/Loader'
import SubscribeButton from '../../components/ui/ProfileUI/SubscribeButton/SubscribeButton'
import VideoGridMini from '../../components/ui/VideoGridUI/VideoGridMini/VideoGridMini'
import { toastConfig } from '../../config/toast.config'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { numberFormat } from '../../utils/number.format'
import cl from './ProfileByUsernamePage.module.scss'
import { subscribersFormat } from '../../utils/subscribers.format'

const ProfileByUsernamePage = () => {
	const {
		user: { token, id },
	} = useTypedSelector(state => state.auth)
	const [subscribe] = useSubscribeMutation()
	const [radio, setRadio] = useState('video')
	const params: any = useParams()
	const [
		getProfileByUsernameAuth,
		{ data: profileDataAuth, isLoading: isLoadingProfileDataAuth },
	] = useLazyGetProfileByUsernameAuthQuery()
	const [
		getProfileByUsername,
		{ data: profileData, isLoading: isLoadingProfileData },
	] = useLazyGetProfileByUsernameQuery()
	const { data: videos, isLoading: isLoadingVideos } =
		useGetProfileVideosByUsernameQuery(params.username)

	useEffect(() => {
		if (token) {
			getProfileByUsernameAuth({
				username: params.username,
				token: token || '',
			})
		} else {
			getProfileByUsername(params.username)
		}
	}, [token, params.username])

	return (
		<>
			{isLoadingProfileData || isLoadingProfileDataAuth ? (
				<Loader />
			) : (
				<div className='flex flex-col gap-4 grow'>
					<div>
						<div className={cl.header}>
							<img
								src={profileDataAuth?.header_path || profileData?.header_path}
								alt=''
								className='h-full w-full object-cover border border-transparent'
							/>
						</div>
						<div className={cl.info}>
							<div className='flex flex-col h-full mx-20'>
								<div className='flex items-center justify-between grow'>
									<div className='flex items-center gap-4'>
										<img
											src={
												profileDataAuth?.avatar_path ||
												profileData?.avatar_path ||
												profileIcon
											}
											alt='profileIcon'
											width={78}
											className='border-4 border-transparent rounded-full hover:border-dashed hover:border-blue-400 hover:scale-110 duration-300'
										/>
										<div>
											<p className='text-2xl'>
												{profileDataAuth?.username ||
													profileData?.username ||
													'username'}
											</p>
											<div className='flex gap-1 text-zinc-400'>
												<p>
													{numberFormat(
														profileData?.subscribers_count ||
															profileDataAuth?.subscribers_count ||
															0
													)}
												</p>
												<p>
													{subscribersFormat(
														profileData?.subscribers_count ||
															profileDataAuth?.subscribers_count ||
															0
													)}
												</p>
											</div>
										</div>
									</div>

									<div>
										<p className={cl.description}>
											{profileDataAuth?.description || profileData?.description}
										</p>
									</div>

									{token ? (
										id === (profileDataAuth?.id || 0) ? (
											<></>
										) : !profileDataAuth?.is_subscribed ? (
											<SubscribeButton
												onClick={() =>
													subscribe({
														userId: profileDataAuth?.id || 0,
														token: token || '',
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
														userId: profileDataAuth?.id || 0,
														token: token || '',
													})
												}
											>
												вы подписаны
											</button>
										)
									) : (
										<SubscribeButton
											onClick={() =>
												toast.info('Войдите, чтобы подписаться', toastConfig)
											}
										>
											Подписаться
										</SubscribeButton>
									)}
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
						(videos && profileData && (
							<VideoGridMini
								videos={videos}
								user={{
									username: profileData.username,
									avatar_path: profileData.avatar_path,
								}}
							/>
						)) ||
						(videos && profileDataAuth && (
							<VideoGridMini
								videos={videos}
								user={{
									username:
										profileData?.username || profileDataAuth?.username || '',
									avatar_path:
										profileData?.avatar_path ||
										profileDataAuth?.avatar_path ||
										'',
								}}
							/>
						))
					)}
				</div>
			)}
		</>
	)
}

export default ProfileByUsernamePage
