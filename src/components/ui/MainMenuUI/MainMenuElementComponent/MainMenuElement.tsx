import React, { FC } from 'react'
import { IMainMenuElement } from './mainMenuElement.interface'
import cl from './MainMenuElement.module.scss'

const MainMenuElement: FC<IMainMenuElement> = ({
	icon,
	title,
	isChecked,
	onClick,
	id,
}) => {
	return (
		<li className={cl.container} onClick={() => onClick(id)}>
			{icon}
			<p
				className={!isChecked ? cl.title : `${cl.title} ${cl.title_isChecked}`}
			>
				{title}
			</p>
		</li>
	)
}

export default MainMenuElement
