import React, { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { toastConfig } from '../../config/toast.config'
import { durationFormat } from '../../utils/duration.format'
import { getFilename } from '../../utils/getFilename.util'
import { imgValidator } from '../../validator/img.validator'
import AuthInput from '../ui/AuthFormUI/AuthInput/AuthInput'
import SubscribeButton from '../ui/ProfileUI/SubscribeButton/SubscribeButton'
import cl from './AddVideoDetails.module.scss'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import axios from 'axios'
import { useUploadImageMutation } from '../../api/media.api'
import { BsCheckLg } from 'react-icons/bs'
import { IVideoAdd } from '../../models/video/video-add.interface'
import { useAddVideoMutation } from '../../api/video.api'
import { useActions } from '../../hooks/useActions'
import { useGetProfileQuery } from '../../api/user.api'

interface IAddVideoDetailsProps {
	videoFile: any
}

const AddVideoDetails: FC<IAddVideoDetailsProps> = ({ videoFile }) => {
	const [isComplete, setIsComplete] = useState(false)
	const { setIsOpenModalWindow } = useActions()
	const [progress, setProgress] = useState<number>(0)

	const {
		user: { id: userId, token },
	} = useTypedSelector(state => state.auth)
	const { register, setValue, handleSubmit } = useForm<IVideoAdd>({
		mode: 'onChange',
	})

	const { data: getProfileUser } = useGetProfileQuery(token || '')

	const [addVideo] = useAddVideoMutation()
	const [uploadImage] = useUploadImageMutation()

	const [videoDuration, setVideoDuration] = useState<string>()

	const [thumbnailImg, setThumbnailImg] = useState()
	const [thumbnailUrl, setThumbnailUrl] = useState<string>()

	const thumbnailReader = new FileReader()
	thumbnailReader.onloadend = () => {
		setThumbnailUrl(thumbnailReader.result as string)
	}

	const handleChangeThumbnail = (event: any) => {
		event.preventDefault()
		if (event.target.files && event.target.files.length) {
			if (event.target.files.length !== 1) {
				toast.error('Максимум одно изображение', toastConfig)
				return
			}

			const file = event.target.files[0]
			const imgValidData = imgValidator(file.name)
			if (!imgValidData.status) {
				toast.error(
					`Некорректный формат изображения .${imgValidData.ext}`,
					toastConfig
				)
				return
			}

			setThumbnailImg(file)
			thumbnailReader.readAsDataURL(file)
		}
	}

	// Заносим имя загруженного видео в title + определяем длительность видео
	useEffect(() => {
		setValue('title', getFilename(videoFile.name))

		const video = document.createElement('video')
		video.preload = 'metadata'

		video.onloadedmetadata = () => {
			URL.revokeObjectURL(video.src)
			const duration = video.duration

			setVideoDuration(durationFormat(duration))
		}

		video.src = URL.createObjectURL(videoFile)
	}, [])

	const onSubmit: SubmitHandler<IVideoAdd> = async dataSubmit => {
		if (!getProfileUser) {
			toast.error('Ошибка пользователя', toastConfig)
			return
		}

		dataSubmit.user = getProfileUser

		if (!videoDuration) {
			toast.error('Ошибка длительности', toastConfig)
		}

		dataSubmit.duration = videoDuration || ''

		if (!thumbnailImg) {
			toast.error('Загрузите превью', toastConfig)
			console.error('Загрузите превью')
			return
		}

		const videoData = new FormData()
		videoData.append('video', videoFile)
		try {
			const videoUploadData: any = await axios.post(
				'http://localhost:4000/api/media/upload/video',
				videoData,
				{
					headers: { Authorization: `Bearer ${token}` },
					onUploadProgress: event => {
						if (event.total)
							setProgress(Math.round((event.loaded * 100) / event.total))
					},
				}
			)

			dataSubmit.videoPath = videoUploadData.data.url
			dataSubmit.vid = videoUploadData.data.vid

			const imgData = new FormData()
			imgData.append('image', thumbnailImg)
			const imgUploadData: any = await uploadImage({
				file: imgData,
				userId: userId || 0,
				token: token || '',
				folder: `videos/vid_${videoUploadData.data.vid}/thumbnail`,
			})

			dataSubmit.thumbnailPath = imgUploadData.data.url

			const addVideoData: any = await addVideo({
				file: dataSubmit,
				token: token || '',
			})
			setIsComplete(true)
			toast.success(addVideoData.data.message, toastConfig)
			setTimeout(() => {
				setIsOpenModalWindow(false)
			}, 3000)
		} catch (e) {
			toast.error(e, toastConfig)
		}
	}

	return (
		<form className='px-4' onSubmit={handleSubmit(onSubmit)}>
			<p className='text-2xl text-center tracking-wide py-4'>Детали видео</p>
			<div className='grid grid-cols-2 gap-8'>
				<div className='flex flex-col gap-2'>
					<AuthInput
						placeholder='Название видео'
						className={cl.input}
						{...register('title')}
					/>
					<textarea
						rows={7}
						className='bg-[#1d1d1d] py-2 px-4 rounded-md resize-none'
						placeholder='Описание видео'
						{...register('description')}
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<input
						type='file'
						accept='.jpg, .jpeg, .png'
						className='hidden'
						id='thumbnail'
						onChange={event => handleChangeThumbnail(event)}
					/>
					<label className={cl.thumbnail} htmlFor='thumbnail'>
						{!thumbnailUrl ? (
							<div className='h-full flex items-center justify-center border border-zinc-500'>
								<p className='text-zinc-400 text-xl'>Загрузить превью</p>
							</div>
						) : (
							<>
								<img
									src={thumbnailUrl}
									alt='thumbnailImg'
									className='object-cover w-full h-full rounded-md'
								/>
							</>
						)}
						<div className={cl.duration}>{videoDuration}</div>
					</label>
					<div className={cl.checkbox}>
						<input
							type='checkbox'
							className={cl.checkbox__input}
							id='private'
							{...register('isPrivate')}
						/>
						<label htmlFor='private' className={cl.checkbox__label}>
							Приватность
						</label>
					</div>
				</div>
			</div>

			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-4 mt-3'>
					{progress > 0 && (
						<>
							<div className='flex items-center gap-1'>
								<p className='text-green-400'>Загрузка</p>
								<p className='text-green-400 font-semibold'>{progress}%</p>
							</div>
							<BsCheckLg className='bg-green-600 p-1 rounded-full' size={27} />
						</>
					)}
					{progress === 100 && (
						<div className='flex gap-2'>
							<p className='text-green-400'>Добавление видео</p>
							{!isComplete ? (
								<div className={cl.circle}></div>
							) : (
								<BsCheckLg
									className='bg-green-600 p-1 rounded-full'
									size={27}
								/>
							)}
						</div>
					)}
				</div>
				<SubscribeButton>Добавить</SubscribeButton>
			</div>
		</form>
	)
}

export default AddVideoDetails
