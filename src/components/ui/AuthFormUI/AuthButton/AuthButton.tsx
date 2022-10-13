import React, { FC } from 'react'
import { IAuthButton } from './authButton.interface'
import cl from './AuthButton.module.scss'

const AuthButton: FC<IAuthButton> = ({ isSpecial, children, ...props }) => {
	const authButtonClass = isSpecial
		? `${cl.base} ${cl.special}`
		: `${cl.base} ${cl.non_special}`
	return (
		<button className={authButtonClass} {...props}>
			{children}
		</button>
	)
}

export default AuthButton
