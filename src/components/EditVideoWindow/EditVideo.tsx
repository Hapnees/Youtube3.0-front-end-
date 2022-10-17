import React, { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { toastConfig } from '../../config/toast.config'
import { imgValidator } from '../../validator/img.validator'
import AuthInput from '../ui/AuthFormUI/AuthInput/AuthInput'
import SubscribeButton from '../ui/ProfileUI/SubscribeButton/SubscribeButton'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useUploadImageMutation } from '../../api/media.api'
import cl from './EditVideoWindow.module.scss'
import { IVideoGet } from '../../models/video/video-get.interface'
import { IVideoUpdate } from '../../models/video/video-uptadte.interface'
import { useUpdateVideoMutation } from '../../api/user.api'
import { useActions } from '../../hooks/useActions'

interface IAddVideoDetailsProps {
	video: IVideoGet
}

const EditVideoWindow: FC<IAddVideoDetailsProps> = ({ video }) => {
	const { setIsOpenModalWindow } = useActions()
	const {
		user: { id: userId, token },
	} = useTypedSelector(state => state.auth)
	const { register, setValue, handleSubmit } = useForm<IVideoUpdate>({
		mode: 'onChange',
	})

	const [updateVideo] = useUpdateVideoMutation()
	const [uploadImage] = useUploadImageMutation()

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
		setValue('title', video.title)
		setValue('isPrivate', video.isPrivate)
		setValue('description', video.description)
	}, [])

	const onSubmit: SubmitHandler<IVideoUpdate> = async dataSubmit => {
		dataSubmit.id = video.id

		if (thumbnailImg) {
			const imgData = new FormData()
			imgData.append('image', thumbnailImg)
			const imgUploadData: any = await uploadImage({
				file: imgData,
				userId: userId || 0,
				token: token || '',
				folder: `videos/vid_${video.vid}/thumbnail`,
			})

			dataSubmit.thumbnailPath = imgUploadData.data.url
		}
		console.log(dataSubmit)
		updateVideo({ file: dataSubmit, token: token || '' })
			.unwrap()
			.then(data => {
				toast.success(data.message, toastConfig)
				setTimeout(() => {
					setIsOpenModalWindow({ isOpen: false })
				}, 3000)
			})
	}

	return (
		<form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
			<p className='text-2xl text-center tracking-wide py-4'>Детали видео</p>
			<div className='grid grid-cols-2 gap-8'>
				<div className='flex flex-col gap-2'>
					<AuthInput
						placeholder='Название видео'
						className={cl.input}
						{...register('title')}
						autoComplete='off'
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
						{!thumbnailUrl && !video.thumbnailPath ? (
							<div className='h-full flex items-center justify-center border border-zinc-500'>
								<p className='text-zinc-400 text-xl'>Загрузить превью</p>
							</div>
						) : (
							<>
								<img
									src={thumbnailUrl || video.thumbnailPath}
									alt='thumbnailImg'
									className='object-cover w-full h-full rounded-md'
								/>
							</>
						)}
						<div className={cl.duration}>{video.duration}</div>
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

			<div className='flex items-center justify-end'>
				<SubscribeButton>Сохранить</SubscribeButton>
			</div>
		</form>
	)
}

export default EditVideoWindow
