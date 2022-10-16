import React, { FC, useState } from 'react'
import testAvatar from '../../assets/img/profile.png'
import cl from './VideoCard.module.scss'
import { IVideoGet } from '../../models/video/video-get.interface'
import { dateAgoFormat } from '../../utils/dateAgo.format'
import { IUserGet } from '../../models/user/user-get.interface'
import { IAuthSlice } from '../../models/auth/auth.interface'
import { numberFormat } from '../../utils/number.format'

interface IVideoCard {
	video: IVideoGet
	user: IUserGet | IAuthSlice
}

const VideoCard: FC<IVideoCard> = ({ video, user }) => {
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
					src={(!!user && user.avatarPath) || testAvatar}
					alt=''
					width={55}
					className='rounded-full p-1 border border-zinc-400 h-full'
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
							<p>{dateAgoFormat(video.createdAt)}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default VideoCard
