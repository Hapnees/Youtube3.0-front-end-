import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import cl from './VideoPage.module.scss'
import { IoHeartSharp } from 'react-icons/io5'
import { IoHeartDislikeSharp } from 'react-icons/io5'
import { BsFillShareFill } from 'react-icons/bs'
import { FaUserAlt } from 'react-icons/fa'
import SubscribeButton from '../../components/ui/ProfileUI/SubscribeButton/SubscribeButton'
import { dateFormat } from '../../utils/date.format'
import { numberFormat } from '../../utils/number.format'
import Loader from '../../components/ui/LoaderUI/Loader'
import {
	useAddCommentMutation,
	useGetCommentsQuery,
	useGetVideoByIdQuery,
} from '../../api/user.api'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useAutosizeTextArea } from '../../hooks/useAutosizeTextarea'
import { AiOutlineLike } from 'react-icons/ai'
import { AiOutlineDislike } from 'react-icons/ai'
import { dateAgoFormat } from '../../utils/dateAgo.format'
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer'
import { toast } from 'react-toastify'
import { toastConfig } from '../../config/toast.config'

const VideoPage = () => {
	const [addComment] = useAddCommentMutation()
	const [textValue, setTextValue] = useState('')
	const textRef = useRef<HTMLTextAreaElement>(null)
	const { user } = useTypedSelector(state => state.auth)
	const params: any = useParams()
	const [isExpanded, setIsExpanded] = useState(false)
	const [isClickedComment, setIsClickedComment] = useState(false)
	const { data: videoData, isLoading: isVideoLoading } = useGetVideoByIdQuery(
		params.id
	)
	const { data: CommentsData, isLoading: isCommentsLoading } =
		useGetCommentsQuery(params.id)

	const { token, ...restUser } = user

	useAutosizeTextArea(textRef.current, textValue)

	const handleClickTextArea = () => {
		if (!user.token) {
			toast.info('Войдите, чтобы оставить комментарий', toastConfig)
			return
		}
		setIsClickedComment(false)
	}

	const handleChangeTextarea = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		const val = event.target.value
		setTextValue(val)
	}

	const handleClickAddComment = () => {
		if (textRef.current && videoData) {
			addComment({
				comment: {
					title: textRef.current.value,
					user: restUser,
					video: videoData,
				},
				token: user.token || '',
			})

			textRef.current.value = ''
			setIsClickedComment(false)
		}
	}

	return (
		<>
			{isVideoLoading ? (
				<Loader />
			) : (
				<div className='flex flex-col gap-4 mt-8 mx-8'>
					<VideoPlayer />
					<div className='w-[1150px] flex flex-col gap-2'>
						<p className={cl.video__title}>{videoData?.title}</p>

						{/* video info */}
						<div className={cl.video__info}>
							<div className={cl.top__info}>
								<div className='flex justify-between'>
									<div className='flex items-center gap-2 text-zinc-400'>
										<p>{numberFormat(videoData?.views || 0)}</p>
										<p>просмотров</p>
										<div className='w-[5px] h-[5px] bg-zinc-400 rounded-full'></div>
										<p>{dateFormat(videoData?.created_at.toString() || '')}</p>
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
										{videoData?.user.avatar_path ? (
											<img
												src={videoData.user.avatar_path}
												alt=''
												className='rounded-full w-[55px] h-[55px] object-cover'
											/>
										) : (
											<FaUserAlt
												className='border-2 rounded-full p-1'
												size={55}
											/>
										)}

										<div>
											<p>{videoData?.user.username || 'username'}</p>
											<p className='text-sm text-zinc-400'>
												250 тыс подписчиков
											</p>
										</div>
									</div>

									<SubscribeButton>Подписаться</SubscribeButton>
								</div>

								<div className='ml-16'>
									<p
										className={
											!isExpanded ? cl.description : cl.description__full
										}
									>
										{videoData?.description}
									</p>
									<p
										className='text-zinc-400 cursor-pointer'
										onClick={() => setIsExpanded(!isExpanded)}
									>
										{!isExpanded ? 'Развернуть' : 'Свернуть'}
									</p>
								</div>
							</div>
						</div>

						<div className='flex flex-col gap-4'>
							<p>83 комментария</p>

							<div className='flex flex-col gap-6'>
								<div>
									<div
										className={
											!isClickedComment
												? 'flex items-center gap-4 pb-2'
												: 'flex flex-col gap-4 pb-2'
										}
									>
										<div className='flex items-center gap-2'>
											{user.avatarPath ? (
												<img
													src={user.avatarPath}
													alt=''
													className='rounded-full w-[45px] h-[45px]'
												/>
											) : (
												<FaUserAlt
													className='border-2 rounded-full p-1'
													size={45}
												/>
											)}

											{isClickedComment && (
												<p className='text-lg'>{user.username}</p>
											)}
										</div>
										<div className='w-full'>
											<textarea
												className={cl.textarea}
												placeholder={
													user.token
														? `${user.username}, вы можете оставить комментарий`
														: 'Войдите, чтобы оставить комментарий'
												}
												onClick={handleClickTextArea}
												onChange={event => handleChangeTextarea(event)}
												rows={1}
												ref={textRef}
												readOnly={user.token ? false : true}
											></textarea>
											<div className='h-[2px] bg-zinc-600 w-full mt-1'></div>
										</div>
									</div>
									{isClickedComment && (
										<div className='flex gap-2 justify-end'>
											<button
												className={
													textValue.length
														? `${cl.button__send} ${cl.button__send__active}`
														: `${cl.button__send} ${cl.button__send__nonactive}`
												}
												onClick={handleClickAddComment}
											>
												Оставить комментарий
											</button>
											<button
												className='px-4 py-2 border border-zinc-500 text-zinc-300 rounded-md uppercase'
												onClick={() => setIsClickedComment(false)}
											>
												Отмена
											</button>
										</div>
									)}
								</div>

								{isCommentsLoading ? (
									<Loader />
								) : (
									<ul className={cl.comments}>
										{CommentsData &&
											CommentsData.map(comment => (
												<li key={comment.id}>
													{comment.user.avatar_path ? (
														<img
															src={comment.user.avatar_path}
															alt=''
															className='rounded-full w-[45px] h-[45px]'
														/>
													) : (
														<FaUserAlt
															className='border-2 rounded-full p-1'
															size={45}
														/>
													)}

													<div>
														<div className='flex items-center gap-2'>
															<p className='font-semibold'>
																{comment.user.username}
															</p>
															<p className='text-zinc-400 text-sm'>
																{dateAgoFormat(comment.created_at)}
															</p>
														</div>

														<div>
															<p className='mb-2'>{comment.title}</p>
															<div className='flex gap-3'>
																<div className={cl.like_dislike}>
																	<AiOutlineLike />
																	<p className={cl.like_dislike__count}>
																		{comment.likes > 0 &&
																			numberFormat(comment.likes)}
																	</p>
																</div>
																<div className={cl.like_dislike}>
																	<AiOutlineDislike />
																	<p className={cl.like_dislike__count}>
																		{comment.dislikes > 0 &&
																			numberFormat(comment.dislikes)}
																	</p>
																</div>
															</div>
														</div>
													</div>
												</li>
											))}
									</ul>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default VideoPage
