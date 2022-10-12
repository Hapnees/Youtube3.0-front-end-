import React, { FC, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AiOutlineClose } from 'react-icons/ai'
import { useRegisterMutation } from '../../../api/auth.api'
import { useActions } from '../../../hooks/useActions'
import { IRegisterFields } from '../../../models/register/registerFields.interface'
import AuthButton from '../../ui/AuthForm/AuthButton/AuthButton'
import AuthInput from '../../ui/AuthForm/AuthInput/AuthInput'
import { IRegisterForm } from './registerForm.interface'
import cl from './RegisterForm.module.scss'

const RegisterForm: FC<IRegisterForm> = ({
	setIsClickedRegisterButton,
	setIsClickedLoginButton,
}) => {
	const { setAuthUser } = useActions()
	const [registerUser, { data: registerData }] = useRegisterMutation()

	const {
		formState: { errors },
		register,
		handleSubmit,
	} = useForm<IRegisterFields>({
		mode: 'onChange',
	})

	// Заносим данные в auth при регистрации
	useEffect(() => {
		if (registerData) setAuthUser(registerData)
	}, [registerData])

	const onSubmit: SubmitHandler<IRegisterFields> = data => {
		registerUser(data)
		setIsClickedRegisterButton(false)
	}

	return (
		<div className={cl.container}>
			<div className='relative'>
				<AiOutlineClose
					className='absolute right-2 top-1 p-1 cursor-pointer'
					color='white'
					size={28}
					onClick={() => setIsClickedLoginButton(false)}
				/>
				<div className='px-4'>
					<p className='text-center py-2 text-xl font-bold tracking-wide'>
						Регистрация
					</p>

					<form
						className='flex flex-col gap-4'
						onSubmit={handleSubmit(onSubmit)}
						id='form'
					>
						<div className='flex flex-col gap-2'>
							<AuthInput
								placeholder='Имя пользователя'
								{...register('username', {
									required: 'Обязательное поле',
									minLength: { value: 3, message: 'Минимум 3 символа' },
								})}
								error={errors.username}
								autoFocus
								autoComplete='off'
							/>
							<AuthInput
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
							/>
							<AuthInput
								placeholder='Пароль'
								type='password'
								{...register('password', {
									required: 'Обязательное поле',
									minLength: { value: 6, message: 'Минимум 6 символов' },
								})}
								error={errors.password}
							/>
						</div>
						<div className='flex flex-col gap-1 mb-2'>
							<AuthButton isSpecial={true} type='submit' form='form'>
								Регистрация
							</AuthButton>
							<AuthButton
								isSpecial={false}
								onClick={() => setIsClickedRegisterButton(false)}
							>
								Назад
							</AuthButton>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
export default RegisterForm
