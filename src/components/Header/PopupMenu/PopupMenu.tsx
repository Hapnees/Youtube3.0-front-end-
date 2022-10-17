import React, { FC } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useActions } from '../../../hooks/useActions'
import cl from './PopupMenu.module.scss'

interface IPopupMenu {
	setIsOpen: (bool: boolean) => void
}

const PopupMenu: FC<IPopupMenu> = ({ setIsOpen }) => {
	const { removeUser, setIsOpenModalWindow } = useActions()
	const loacation = useLocation()
	const navigate = useNavigate()

	const handleClickProfile = () => {
		navigate('/profile')
		setIsOpen(false)
	}

	const handleClickLogout = () => {
		removeUser()
		if (['/profile', '/profile/edit'].includes(loacation.pathname))
			navigate('/')
	}

	const handleClickAddVideo = () => {
		setIsOpenModalWindow({ isOpen: true, type: 'add' })
		setIsOpen(false)
	}

	return (
		<ul className={cl.menu}>
			<li onClick={handleClickProfile}>
				<p>Профиль</p>
			</li>
			<li onClick={handleClickAddVideo}>
				<p>Добавить видео</p>
			</li>
			<li onClick={handleClickLogout}>
				<p>Выйти</p>
			</li>
		</ul>
	)
}

export default PopupMenu
