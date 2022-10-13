import React from 'react'
import { Link } from 'react-router-dom'
import { useActions } from '../../../hooks/useActions'
import cl from './PopupMenu.module.scss'

const PopupMenu = () => {
	const { removeUser } = useActions()

	return (
		<ul className={cl.menu}>
			<li>
				<p>
					<Link to='/profile'>Профиль</Link>
				</p>
			</li>
			<li onClick={removeUser}>
				<p>Выйти</p>
			</li>
		</ul>
	)
}

export default PopupMenu
