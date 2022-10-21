import React, { FC, useState } from 'react'
import testAvatar from '../../assets/img/profile.png'
import cl from './VideoCardMini.module.scss'
import { dateAgoFormat } from '../../utils/dateAgo.format'
import { numberFormat } from '../../utils/number.format'
import { FaLock } from 'react-icons/fa'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { Link } from 'react-router-dom'
import { IVideoGetVideoCardPlus } from '../../models/video/vide-get-VideoCardPlus'
import { useUpdateViewsMutation } from '../../api/user.api'

interface IVideoCardPlus {
	video: IVideoGetVideoCardPlus
	user: { username: string; avatar_path: string }
}

const VideoCardMini: FC<IVideoCardPlus> = ({ video, user }) => {
	const [updateViews] = useUpdateViewsMutation()
	return (
		<Link
			to={`/video/${video.id}`}
			replace={true}
			onClick={() => updateViews(video.id)}
		>
			<div className={cl.container}>
				<div className={cl.thumbnail__container}>
					<div className='w-full h-full flex items-center justify-center'>
						<img
							src={video.thumbnail_path}
							alt=''
							className='object-cover h-full w-full rounded-t-md'
						/>
					</div>

					<div className='absolute inline-flex items-center w-full bottom-2 px-2'>
						{video.is_private && <FaLock className={cl.lock} size={40} />}
						<div className={cl.duration}>{video.duration}</div>
					</div>
				</div>

				<div className='flex gap-2 px-3'>
					<img
						src={(!!user && user.avatar_path) || testAvatar}
						alt=''
						className='rounded-full p-1 w-[55px] h-[55px] border-2 border-zinc-400 hover:border-dashed hover:border-blue-400 hover:scale-110 duration-300'
					/>
					<div className='overflow-hidden mt-1'>
						<div>
							<p className={cl.title}>{video.title}</p>
							<p className='text-zinc-400 w-full whitespace-nowrap overflow-hidden text-ellipsis'>
								{user && user.username}
							</p>

							<div className='flex gap-2 text-zinc-400 whitespace-nowrap'>
								<div className='flex gap-1'>
									<p className='max-w-[40px] overflow-hidden text-ellipsis'>
										{numberFormat(video.views)}
									</p>
									<p>просмотров</p>
								</div>
								<p>{dateAgoFormat(video.created_at)}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default VideoCardMini
