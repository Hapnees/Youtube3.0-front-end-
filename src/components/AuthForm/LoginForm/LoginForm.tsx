import React, { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ILoginFields } from '../../../models/login/loginFields.interface'
import AuthButton from '../../ui/AuthForm/AuthButton/AuthButton'
import AuthInput from '../../ui/AuthForm/AuthInput/AuthInput'
import cl from './LoginForm.module.scss'
import { AiOutlineClose } from 'react-icons/ai'
import { ILoginForm } from './loginForm.interface'
import RegisterForm from '../RegisterForm/RegisterForm'
import { useLoginMutation } from '../../../api/auth.api'
import { useActions } from '../../../hooks/useActions'

const LoginForm: FC<ILoginForm> = ({ setIsClickedLoginButton }) => {
	const [loginUser, { data: loginData }] = useLoginMutation()
	const { setAuthUser } = useActions()
	const [isClickedRegister, setIsClickedRegister] = useState<boolean>(false)
	const {
		formState: { errors },
		register,
		handleSubmit,
		reset,
	} = useForm<ILoginFields>({ mode: 'onChange' })

	// Заносим данные в auth при логине
	useEffect(() => {
		if (loginData) setAuthUser(loginData)
	}, [loginData])

	const onClickRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		setIsClickedRegister(true)
	}

	const onSubmit: SubmitHandler<ILoginFields> = data => {
		loginUser(data)
		setIsClickedLoginButton(false)
	}

	return (
		<>
			{isClickedRegister ? (
				<RegisterForm
					setIsClickedRegisterButton={setIsClickedRegister}
					setIsClickedLoginButton={() => setIsClickedLoginButton(false)}
				/>
			) : (
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
								Вход
							</p>

							<form
								className='flex flex-col gap-4'
								onSubmit={handleSubmit(onSubmit)}
							>
								<div className='flex flex-col gap-2'>
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
										autoFocus
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
									<AuthButton isSpecial={true}>Войти</AuthButton>
									<AuthButton
										isSpecial={false}
										onClick={event => onClickRegister(event)}
									>
										Регистрация
									</AuthButton>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default LoginForm
