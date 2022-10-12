import React from 'react'
import cl from './PopupMenu.module.scss'

const PopupMenu = () => {
	return (
		<ul className={cl.menu}>
			<li>
				<p>Профиль</p>
			</li>
			<li>
				<p>Выйти</p>
			</li>
		</ul>
	)
}

export default PopupMenu
