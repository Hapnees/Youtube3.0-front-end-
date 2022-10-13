import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useActions } from '../../../hooks/useActions'
import cl from './PopupMenu.module.scss'

const PopupMenu = () => {
	const { removeUser } = useActions()
	const navigate = useNavigate()

	return (
		<ul className={cl.menu}>
			<li onClick={() => navigate('/profile')}>
				<p>Профиль</p>
			</li>
			<li onClick={removeUser}>
				<p>Выйти</p>
			</li>
		</ul>
	)
}

export default PopupMenu
