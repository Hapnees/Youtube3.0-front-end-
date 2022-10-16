import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetVideoByIdQuery } from '../../api/video.api'
import cl from './VideoPage.module.scss'
import { IoHeartSharp } from 'react-icons/io5'
import { IoHeartDislikeSharp } from 'react-icons/io5'
import { BsFillShareFill } from 'react-icons/bs'
import { FaUserAlt } from 'react-icons/fa'
import SubscribeButton from '../../components/ui/ProfileUI/SubscribeButton/SubscribeButton'
import { dateFormat } from '../../utils/date.format'
import { numberFormat } from '../../utils/number.format'
import Loader from '../../components/ui/LoaderUI/Loader'
import { useLazyGetProfileByIdQuery } from '../../api/user.api'

const VideoPage = () => {
	const params: any = useParams()
	const { data: videoData, isLoading: isVideoLoading } = useGetVideoByIdQuery(
		params.id
	)

	return (
		<>
			{isVideoLoading ? (
				<Loader />
			) : (
				<div className='flex flex-col gap-4 mt-8 mx-8'>
					<div className={cl.player}></div>
					<div className='w-[1150px] flex flex-col gap-2'>
						<p className={cl.video__title}>{videoData?.title}</p>

						{/* video info */}
						<div>
							<div className={cl.top__info}>
								<div className='flex justify-between'>
									<div className='flex items-center gap-2 text-zinc-400'>
										<p>{numberFormat(videoData?.views || 0)}</p>
										<p>просмотров</p>
										<div className='w-[5px] h-[5px] bg-zinc-400 rounded-full'></div>
										<p>{dateFormat(videoData?.createdAt.toString() || '')}</p>
									</div>

									<div className='flex gap-2'>
										<div className={`${cl.button} ${cl.button__like}`}>
											<IoHeartSharp />
											<p>Лайк</p>
											<div className='flex gap-1'>
												<p className='font-semibold'>
													{numberFormat(videoData?.likes || 0)}
												</p>
											</div>
										</div>
										<div className={`${cl.button} ${cl.button__dislike}`}>
											<IoHeartDislikeSharp />
											<p>Дизлайк</p>
											<div className='flex gap-1'>
												<p className='font-semibold'>
													{numberFormat(videoData?.dislikes || 0)}
												</p>
											</div>
										</div>
										<div className={`${cl.button} ${cl.button__share}`}>
											<BsFillShareFill />
											Поделиться
										</div>
									</div>
								</div>
							</div>

							{/* Chanell + subcribe */}
							<div className='flex flex-col gap-6'>
								<div className='flex justify-between'>
									<div className='flex items-center gap-2'>
										{videoData?.user.avatarPath ? (
											<img
												src={videoData.user.avatarPath}
												alt=''
												width={55}
												className='rounded-full object-cover'
											/>
										) : (
											<FaUserAlt
												className='border-2 rounded-full p-1'
												size={55}
											/>
										)}

										<div>
											<p>{videoData?.user?.username || 'username'}</p>
											<p className='text-sm text-zinc-400'>
												250 тыс подписчиков
											</p>
										</div>
									</div>

									<SubscribeButton>Подписаться</SubscribeButton>
								</div>

								<div className='ml-16'>
									<p>{videoData?.description}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default VideoPage
