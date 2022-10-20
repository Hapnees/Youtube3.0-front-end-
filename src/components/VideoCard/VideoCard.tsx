import React, { FC } from 'react'
import testAvatar from '../../assets/img/profile.png'
import { dateAgoFormat } from '../../utils/dateAgo.format'
import cl from './VideoCard.module.scss'
import { numberFormat } from '../../utils/number.format'
import { Link, useNavigate } from 'react-router-dom'
import { IVideoGetVideoCard } from '../../models/video/video-get-VideoCardinterface'

interface IVideoCard {
	video: IVideoGetVideoCard
}

const VideoCard: FC<IVideoCard> = ({ video }) => {
	const navigate = useNavigate()
	const handleClickAvatar = (event: any) => {
		event.preventDefault()
		navigate(`/user/${video.user.username}`)
	}
	return (
		<Link to={`video/${video.id}`}>
			<div className={cl.container}>
				<div className={cl.thumbnail__container}>
					<img
						src={video.thumbnail_path}
						alt=''
						className='object-cover h-full w-full rounded-t-md'
					/>
					<div className={cl.duration}>{video.duration}</div>
				</div>

				<div className='flex gap-2 px-3'>
					<img
						src={video.user.avatar_path || testAvatar}
						alt=''
						className='rounded-full p-1 border-2 h-[55px] w-[55px] border-zinc-400 hover:scale-110 hover:border-dashed hover:border-blue-400 duration-300'
						onClick={event => handleClickAvatar(event)}
					/>
					<div className='overflow-hidden mt-1'>
						<div>
							<p className={cl.title}>{video.title}</p>
							<p className='text-zinc-400 w-full whitespace-nowrap overflow-hidden text-ellipsis'>
								{video.user.username}
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

export default VideoCard
