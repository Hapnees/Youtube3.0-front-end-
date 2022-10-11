import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { ILoginFields } from '../../../models/loginFields.interface'
import AuthButton from '../../ui/AuthForm/AuthButton/AuthButton'
import AuthInput from '../../ui/AuthForm/AuthInput/AuthInput'
import cl from './LoginForm.module.scss'
import { AiOutlineClose } from 'react-icons/ai'
import { ILoginForm } from './loginForm.interface'

const LoginForm: FC<ILoginForm> = ({ setIsClickedLoginButton }) => {
	const { register } = useForm<ILoginFields>()

	return (
		<div className={cl.container}>
			<div className='relative'>
				<AiOutlineClose
					className='absolute right-0 top-1 p-1 cursor-pointer'
					color='white'
					size={28}
					onClick={setIsClickedLoginButton}
				/>
				<p className='text-center py-2 text-xl font-bold tracking-wide'>Вход</p>

				<form className='flex flex-col gap-4'>
					<div className='flex flex-col gap-2'>
						<AuthInput placeholder='Почта' autoFocus />
						<AuthInput placeholder='Пароль' type='password' />
					</div>
					<div className='flex flex-col gap-1 mb-4'>
						<AuthButton isSpecial={true}>Войти</AuthButton>
						<AuthButton isSpecial={false}>Регистрация</AuthButton>
					</div>
				</form>
			</div>
		</div>
	)
}

export default LoginForm
