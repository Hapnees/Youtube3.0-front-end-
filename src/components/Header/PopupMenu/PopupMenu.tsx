import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useActions } from '../../../hooks/useActions'
import cl from './PopupMenu.module.scss'

interface IPopupMenu {
	setIsOpen: (bool: boolean) => void
}

const PopupMenu: FC<IPopupMenu> = ({ setIsOpen }) => {
	const { removeUser } = useActions()
	const navigate = useNavigate()

	const handleClickProfile = () => {
		navigate('/profile')
		setIsOpen(false)
	}

	return (
		<ul className={cl.menu}>
			<li onClick={handleClickProfile}>
				<p>Профиль</p>
			</li>
			<li onClick={removeUser}>
				<p>Выйти</p>
			</li>
		</ul>
	)
}

export default PopupMenu
