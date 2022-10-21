import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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
	useAddDislikeCommentMutation,
	useAddDislikeVideoMutation,
	useAddLikeCommentMutation,
	useAddLikeVideoMutation,
	useGetCommentsQuery,
	useGetVideoByIdQuery,
	useSubscribeMutation,
} from '../../api/user.api'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useAutosizeTextArea } from '../../hooks/useAutosizeTextarea'
import { AiFillLike } from 'react-icons/ai'
import { AiFillDislike } from 'react-icons/ai'
import { dateAgoFormat } from '../../utils/dateAgo.format'
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer'
import { toast } from 'react-toastify'
import { toastConfig } from '../../config/toast.config'
import { countCommentFormat } from '../../utils/countComment.format'
import { viewsFormat } from '../../utils/views.format'

const VideoPage = () => {
	const [subscribe] = useSubscribeMutation()
	const [addDislikeComment] = useAddDislikeCommentMutation()
	const [addLikeComment] = useAddLikeCommentMutation()
	const [addLikeVideo] = useAddLikeVideoMutation()
	const [addDislikeVideo] = useAddDislikeVideoMutation()
	const [addComment] = useAddCommentMutation()
	const [textValue, setTextValue] = useState('')
	const textRef = useRef<HTMLTextAreaElement>(null)
	const { user } = useTypedSelector(state => state.auth)
	const params: any = useParams()
	const [isExpanded, setIsExpanded] = useState(false)
	const [isClickedComment, setIsClickedComment] = useState(false)
	const { data: videoData, isLoading: isVideoLoading } = useGetVideoByIdQuery({
		id: params.id,
		idFrom: user.id || 0,
	})
	const { data: CommentsData, isLoading: isCommentsLoading } =
		useGetCommentsQuery(params.id)

	const { token, ...restUser } = user

	useAutosizeTextArea(textRef.current, textValue)

	const handleClickTextArea = () => {
		if (!user.token) {
			toast.info('Войдите, чтобы оставить комментарий', toastConfig)
			return
		}
		setIsClickedComment(true)
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

	const handleClickLikeVideo = () => {
		if (videoData) addLikeVideo({ id: videoData.id, token: user.token || '' })
	}

	const handleClickDislikeVideo = () => {
		if (videoData)
			addDislikeVideo({ id: videoData.id, token: user.token || '' })
	}

	const handleClickLikeComment = (commentId: number) => {
		if (videoData)
			addLikeComment({
				body: { userId: user.id || 0, commentId },
				token: user.token || '',
			})
	}

	const handleClickDislikeComment = (commentId: number) => {
		if (videoData)
			addDislikeComment({
				body: { userId: user.id || 0, commentId },
				token: user.token || '',
			})
	}

	return (
		<>
			{isVideoLoading ? (
				<Loader />
			) : (
				<div className='flex flex-col gap-4 mt-8 mx-8'>
					<VideoPlayer videoData={videoData} />
					<div className='w-[1150px] flex flex-col gap-2'>
						<p className={cl.video__title}>{videoData?.title}</p>

						{/* video info */}
						<div className={cl.video__info}>
							<div className={cl.top__info}>
								<div className='flex justify-between'>
									<div className='flex items-center gap-2 text-zinc-400'>
										<p>{numberFormat(videoData?.views || 0)}</p>
										<p>{viewsFormat(videoData?.views || 0)}</p>
										<div className='w-[5px] h-[5px] bg-zinc-400 rounded-full'></div>
										<p>{dateFormat(videoData?.created_at.toString() || '')}</p>
									</div>

									<div className='flex gap-2'>
										<div
											className={
												!videoData?.user.is_liked
													? `${cl.button} ${cl.button__like}`
													: `${cl.button} ${cl.button__like__active}`
											}
											onClick={handleClickLikeVideo}
										>
											<IoHeartSharp />
											<p>Лайк</p>
											<div className='flex gap-1'>
												<p className='font-semibold'>
													{numberFormat(videoData?.likes || 0)}
												</p>
											</div>
										</div>
										<div
											className={
												!videoData?.user.is_disliked
													? `${cl.button} ${cl.button__dislike}`
													: `${cl.button} ${cl.button__dislike__active}`
											}
											onClick={handleClickDislikeVideo}
										>
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
											<Link to={`/user/${videoData.user.username}`}>
												<img
													src={videoData.user.avatar_path}
													alt=''
													className='border-4 border-dashed border-transparent rounded-full w-[65px] h-[65px] object-cover hover:border-blue-400  hover:scale-110 duration-300 cursor-pointer'
												/>
											</Link>
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

									{user.token ? (
										user.id !== videoData?.user.id ? (
											!videoData?.user.is_subscribed ? (
												<SubscribeButton
													onClick={() =>
														subscribe({
															userId: videoData?.user.id || 0,
															token: user.token || '',
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
															userId: videoData?.user.id || 0,
															token: user.token || '',
														})
													}
												>
													вы подписаны
												</button>
											)
										) : (
											<></>
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
							<p>{`${numberFormat(
								CommentsData?.length || 0
							)} ${countCommentFormat(CommentsData?.length || 0)}`}</p>

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
															<p className='mb-1'>{comment.title}</p>
															<div className='flex gap-3'>
																<div
																	className={cl.like_dislike}
																	onClick={() =>
																		handleClickLikeComment(comment.id)
																	}
																>
																	<AiFillLike
																		color={
																			comment.likes.ids.some(
																				el => el === user.id
																			)
																				? 'red'
																				: 'white'
																		}
																	/>
																	<p className={cl.like_dislike__count}>
																		{comment.likes.count > 0 &&
																			numberFormat(comment.likes.count)}
																	</p>
																</div>
																<div
																	className={cl.like_dislike}
																	onClick={() =>
																		handleClickDislikeComment(comment.id)
																	}
																>
																	<AiFillDislike
																		color={
																			comment.dislikes.ids.some(
																				el => el === user.id
																			)
																				? '#295fe5'
																				: 'white'
																		}
																	/>
																	<p className={cl.like_dislike__count}>
																		{comment.dislikes.count > 0 &&
																			numberFormat(comment.dislikes.count)}
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
