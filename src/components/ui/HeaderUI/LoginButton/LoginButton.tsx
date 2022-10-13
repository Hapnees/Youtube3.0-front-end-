import React, { FC } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { ILoginButton } from './loginButton.interface'
import cl from './LoginButton.module.scss'

const LoginButton: FC<ILoginButton> = ({ isClickedLoginButton, ...props }) => {
	const loginButtonClass = isClickedLoginButton
		? `${cl.base} ${cl.active}`
		: `${cl.base} ${cl.non_active}`

	return (
		<div className={loginButtonClass} {...props}>
			<FaUserAlt />
			<p className='font-bold text-lg'>Вход</p>
		</div>
	)
}

export default LoginButton
