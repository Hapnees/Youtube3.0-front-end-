import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { toastConfig } from '../../config/toast.config'
import { videoValidator } from '../../validator/video.validator'
import AddVideoDetails from '../AddVIdeoDetails/AddVideoDetails'
import cl from './AddVideoWindow.module.scss'

const AddVideoWindow = () => {
	const [isUpload, setIsUpload] = useState(false)
	const [videoFile, setVideoFile] = useState()

	const handleChangeVideo = (event: any) => {
		event.preventDefault()
		if (event.target.files && event.target.files.length) {
			if (event.target.files.length !== 1) {
				toast.error('Максимум одно видео', toastConfig)
				return
			}

			const file = event.target.files[0]
			const videoValidData = videoValidator(file.name)
			if (!videoValidData.status) {
				toast.error(
					`Некорректный формат видео .${videoValidData.ext}`,
					toastConfig
				)
				return
			}

			setIsUpload(true)
			setVideoFile(file)
		}
	}

	return (
		<div className={cl.container}>
			{!isUpload ? (
				<div className='flex justify-center items-center h-full'>
					<div className='flex flex-col gap-4'>
						<p className={cl.title}>Загрузите видео</p>
						<input
							type='file'
							accept='.mp4, .MP4'
							id='video'
							className='hidden'
							onChange={event => handleChangeVideo(event)}
						/>
						<label htmlFor='video' className={cl.button}>
							Загрузить...
						</label>
					</div>
				</div>
			) : (
				<AddVideoDetails videoFile={videoFile} />
			)}
		</div>
	)
}

export default AddVideoWindow
