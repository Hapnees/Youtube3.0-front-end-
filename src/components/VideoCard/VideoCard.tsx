import React, { FC } from 'react'
import testAvatar from '../../assets/img/ava.jpg'
import cl from './VideoCard.module.scss'
import { IVideoGet } from '../../models/video/video-get.interface'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { dateFormat } from '../../utils/date.format'

interface IVideoCard {
	video: IVideoGet
}

const VideoCard: FC<IVideoCard> = ({ video }) => {
	const {
		user: { avatarPath, username },
	} = useTypedSelector(state => state.auth)
	console.log(video)
	return (
		<div className={cl.container}>
			<div className={cl.thumbnail__container}>
				<img
					src={video.thumbnailPath}
					alt=''
					className='object-cover h-full w-full rounded-t-md'
				/>
				<div className={cl.duration}>{video.duration}</div>
			</div>

			<div className='flex gap-2 px-3'>
				<img
					src={avatarPath}
					alt=''
					width={55}
					className='rounded-full p-1 border border-zinc-400 h-full'
				/>
				<div className='overflow-hidden mt-1'>
					<div>
						<p className={cl.title}>{video.title}</p>
						<p className='text-zinc-400 w-full whitespace-nowrap overflow-hidden text-ellipsis'>
							{username}
						</p>

						<div className='flex gap-2 text-zinc-400 whitespace-nowrap'>
							<div className='flex gap-1'>
								<p className='max-w-[40px] overflow-hidden text-ellipsis'>
									{video.views}
								</p>
								<p>просмотров</p>
							</div>
							<p>{dateFormat(video.createdAt)}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default VideoCard
