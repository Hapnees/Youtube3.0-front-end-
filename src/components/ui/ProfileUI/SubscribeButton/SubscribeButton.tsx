import React, { FC } from 'react'
import cl from './SubscribeButton.module.scss'
import { ISubscribeButton } from './subscribeButton.interface'

const SubscribeButton: FC<ISubscribeButton> = ({
	children,
	onClick,
	className,
	form,
}) => {
	return (
		<button
			className={`${cl.button} ${className}`}
			onClick={onClick}
			form={form}
		>
			{children}
		</button>
	)
}

export default SubscribeButton
