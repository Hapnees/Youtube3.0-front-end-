import React, { FC } from 'react'
import { useActions } from '../../../hooks/useActions'
import cl from './ModalWindow.module.scss'
import { AiOutlineClose } from 'react-icons/ai'

interface IModalWindow {
	children: React.ReactNode
}

const ModalWindow: FC<IModalWindow> = ({ children }) => {
	const { setIsOpenModalWindow } = useActions()
	const handleClickClose = () => {
		setIsOpenModalWindow(false)
	}

	return (
		<div className={cl.container}>
			<div className='relative'>
				<AiOutlineClose
					className='absolute top-2 right-3 p-1 cursor-pointer'
					color='gray'
					size={30}
					onClick={handleClickClose}
				/>
				{children}
			</div>
		</div>
	)
}

export default ModalWindow
