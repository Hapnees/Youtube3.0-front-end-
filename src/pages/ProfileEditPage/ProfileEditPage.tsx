import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import AuthInput from '../../components/ui/AuthFormUI/AuthInput/AuthInput'
import { IProfleEdit } from '../../models/profileEdit/profileEdit.interface'
import cl from './ProfileEditPage.module.scss'
import ava from '../../assets/img/profile.png'
import SubscribeButton from '../../components/ui/ProfileUI/SubscribeButton/SubscribeButton'
import { toast } from 'react-toastify'
import { toastConfig } from '../../config/toast.config'
import {
	useGetProfileQuery,
	useUpdateProfileMutation,
} from '../../api/user.api'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { imgValidator } from '../../validator/img.validator'
import { useActions } from '../../hooks/useActions'
import { useUploadImageMutation } from '../../api/media.api'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/ui/LoaderUI/Loader'

const ProfileEditPage = () => {
	const navigate = useNavigate()
	const { setAuthUser } = useActions()

	const [uploadImage] = useUploadImageMutation()
	const [updateProfile] = useUpdateProfileMutation()

	const {
		user: { token, id: userId },
	} = useTypedSelector(state => state.auth)
	const { data: profileData, isLoading: isLoadingProfileData } =
		useGetProfileQuery(token || '')

	const {
		setValue,
		handleSubmit,
		formState: { errors },
		register,
	} = useForm<IProfleEdit>({
		mode: 'onChange',
	})

	// Проверка на токен
	useEffect(() => {
		if (!token) {
			setTimeout(() => {
				navigate('/')
			}, 2000)
		}
	}, [token])

	// Заносим данные из profileData в поля формы при запуске
	useEffect(() => {
		if (profileData?.username) setValue('username', profileData.username)
		if (profileData?.email) setValue('email', profileData.email)
		if (profileData?.description)
			setValue('description', profileData.description)
		if (profileData?.avatarPath) setValue('avatarPath', profileData?.avatarPath)
		if (profileData?.headerPath) setValue('headerPath', profileData?.headerPath)
	}, [profileData])

	const [avatarImg, setAvatarImg] = useState()
	const [avatarUrl, setAvatarUrl] = useState<string>()
	const avatarReader = new FileReader()
	avatarReader.onloadend = () => {
		setAvatarUrl(avatarReader.result as string)
	}

	const [headerImg, setHeaderImg] = useState()
	const [headerUrl, setHeaderUrl] = useState<string>()
	const headerReader = new FileReader()
	headerReader.onloadend = () => {
		setHeaderUrl(headerReader.result as string)
	}

	const handleChangeAvatar = (event: any) => {
		event.preventDefault()
		if (event.target.files && event.target.files.length) {
			if (event.target.files.length !== 1) {
				toast.error('Максимум одно изображение', toastConfig)
				return
			}
			const file = event.target.files[0]
			const imgValidData = imgValidator(file.name)
			console.log(imgValidData)
			if (!imgValidData.status) {
				toast.error(
					`Некорректный формат изображения ${imgValidData.ext}`,
					toastConfig
				)
				return
			}
			setAvatarImg(file)
			avatarReader.readAsDataURL(file)
		}
	}

	const handleChangeHeader = (event: any) => {
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
			setHeaderImg(file)
			headerReader.readAsDataURL(file)
		}
	}

	const onSubmit: SubmitHandler<IProfleEdit> = async dataSubmit => {
		if (!dataSubmit.password) delete dataSubmit.password

		if (avatarImg && userId) {
			const avatar = new FormData()
			avatar.append('image', avatarImg)
			const { data: avatarData }: any = await uploadImage({
				file: avatar,
				userId,
				folder: 'avatar',
				token: token || '',
			})
			dataSubmit.avatarPath = avatarData.url
		}

		if (headerImg && userId) {
			const header = new FormData()
			header.append('image', headerImg)
			const { data: headerData }: any = await uploadImage({
				file: header,
				userId,
				folder: 'header',
				token: token || '',
			})
			dataSubmit.headerPath = headerData.url
		}

		setAuthUser({
			username: dataSubmit.username,
			email: dataSubmit.email,
			avatarPath: dataSubmit.avatarPath,
		})
		updateProfile({
			token: token || '',
			userData: dataSubmit,
		})
		toast.success('Профиль успешно отредактирован', toastConfig)
	}

	return (
		<>
			{isLoadingProfileData ? (
				<Loader />
			) : (
				<div className='grow'>
					<div>
						<img
							src={headerUrl || profileData?.headerPath}
							className={cl.header}
						></img>
						<label
							className='block text-end text-[#4eb3ea] mr-10 mt-1 cursor-pointer hover:underline'
							htmlFor='header'
						>
							Изменить шапку
						</label>
						<input
							type='file'
							id='header'
							className='hidden'
							accept='.png, .jpg, .jpeg'
							onChange={handleChangeHeader}
						/>
					</div>

					<form
						className='inline-flex flex-col gap-[50px] w-full'
						onSubmit={handleSubmit(onSubmit)}
						noValidate
					>
						<div className='flex justify-between mr-[100px]'>
							<div className='flex items-center gap-[50px]'>
								<div className='relative'>
									<img
										src={avatarUrl || profileData?.avatarPath || ava}
										alt='avatarIcon'
										className='object-cover w-[200px] h-[200px]'
									/>
									<input
										type='file'
										id='avatar'
										className='hidden'
										accept='.png, .jpg, .jpeg'
										onChange={handleChangeAvatar}
									/>
									<label
										className='block absolute right-[20%] bottom-[-14%] text-[#4eb3ea] cursor-pointer hover:underline'
										htmlFor='avatar'
									>
										Изменить фото
									</label>
								</div>
								<div className='flex flex-col gap-4'>
									<div className='flex items-center gap-2'>
										<p className='text-zinc-500 w-[150px]'>Имя пользователя</p>
										<AuthInput
											className={cl.input}
											placeholder='Имя пользователя'
											{...register('username', {
												required: 'Обязательное поле',
												minLength: { value: 3, message: 'Минимум 3 символа' },
											})}
											error={errors.username}
											autoComplete='off'
											horizontal={true}
										/>
									</div>
									<div className='flex items-center gap-2'>
										<p className='text-zinc-500 w-[150px]'>Почта</p>
										<AuthInput
											className={cl.input}
											placeholder='Почта'
											{...register('email', {
												required: 'Обязательное поле',
												pattern: {
													value:
														/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
													message: 'Некорректный email',
												},
											})}
											error={errors.email}
											autoComplete='off'
											horizontal={true}
										/>
									</div>
									<div className='flex items-center gap-2'>
										<p className='text-zinc-500 w-[150px]'>Новый пароль</p>
										<AuthInput
											className={cl.input}
											placeholder='Пароль'
											type='password'
											{...register('password', {
												minLength: { value: 6, message: 'Минимум 6 символов' },
											})}
											error={errors.password}
											horizontal={true}
										/>
									</div>
								</div>
							</div>
							<SubscribeButton>Сохранить</SubscribeButton>
						</div>
						<div className='flex flex-col gap-2'>
							<p className='text-zinc-500'>Описание канала</p>
							<textarea
								{...register('description')}
								placeholder='Описание канала'
								rows={8}
								cols={100}
								className='self-start bg-[#1d1d1d] px-4 py-2 resize-none rounded-md'
							></textarea>
						</div>
					</form>
				</div>
			)}
		</>
	)
}

export default ProfileEditPage
