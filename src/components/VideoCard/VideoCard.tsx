import React, { FC, useState } from 'react'
import testAvatar from '../../assets/img/profile.png'
import cl from './VideoCard.module.scss'
import { IVideoGet } from '../../models/video/video-get.interface'
import { dateAgoFormat } from '../../utils/dateAgo.format'
import { IUserGet } from '../../models/user/user-get.interface'
import { IAuthSlice } from '../../models/auth/auth.interface'
import { numberFormat } from '../../utils/number.format'
import { FaLock } from 'react-icons/fa'
import { MdModeEdit } from 'react-icons/md'
import { BsFillTrashFill } from 'react-icons/bs'
import { CSSTransition } from 'react-transition-group'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useActions'
import { useDeleteVideoMutation } from '../../api/user.api'
import { toast } from 'react-toastify'
import { toastConfig } from '../../config/toast.config'
import { Link, useNavigate } from 'react-router-dom'

interface IVideoCard {
	video: IVideoGet
	user: IUserGet | IAuthSlice
}

const VideoCard: FC<IVideoCard> = ({ video, user }) => {
	const navigate = useNavigate()
	const {
		user: { token },
	} = useTypedSelector(state => state.auth)
	const [isOpenMenu, setIsOpenMenu] = useState(false)
	const { setIsOpenModalWindow } = useActions()

	const [deletVideo] = useDeleteVideoMutation()

	const handleClickEdit = (event: any) => {
		event.preventDefault()
		setIsOpenModalWindow({ isOpen: true, type: 'edit', data: video })
	}

	const handleClickDelete = async (event: any) => {
		event.preventDefault()
		deletVideo({ id: video.id, token: token || '' })
			.unwrap()
			.then(data => toast.success(data.message, toastConfig))
	}

	return (
		<Link to={`/video/${video.id}`} replace={true}>
			<div className={cl.container}>
				<div className={cl.thumbnail__container}>
					<div
						className='w-full h-full flex items-center justify-center'
						onMouseEnter={() => setIsOpenMenu(true)}
						onMouseLeave={() => setIsOpenMenu(false)}
					>
						<img
							src={video.thumbnailPath}
							alt=''
							className='object-cover h-full w-full rounded-t-md'
						/>
						<CSSTransition
							in={isOpenMenu}
							timeout={300}
							unmountOnExit
							classNames='auth'
						>
							<div className='absolute flex gap-2'>
								<MdModeEdit
									size={50}
									className={cl.edit}
									onClick={event => handleClickEdit(event)}
								/>
								<BsFillTrashFill
									size={50}
									className={cl.delete}
									onClick={event => handleClickDelete(event)}
								/>
							</div>
						</CSSTransition>
					</div>

					<div className='absolute inline-flex items-center w-full bottom-2 px-2'>
						{video.isPrivate && <FaLock className={cl.lock} size={40} />}
						<div className={cl.duration}>{video.duration}</div>
					</div>
				</div>

				<div className='flex gap-2 px-3'>
					<img
						src={(!!user && user.avatarPath) || testAvatar}
						alt=''
						className='rounded-full p-1 w-[55px] h-[55px] border border-zinc-400'
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
		</Link>
	)
}

export default VideoCard
