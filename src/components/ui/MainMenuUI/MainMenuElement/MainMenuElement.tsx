import React, { FC } from 'react'
import { IMainMenuElement } from './mainMenuElement.interface'
import cl from './MainMenuElement.module.scss'

const MainMenuElement: FC<IMainMenuElement> = ({ icon, title }) => {
	return (
		<li className={cl.container}>
			{icon}
			<p>{title}</p>
		</li>
	)
}

export default MainMenuElement
