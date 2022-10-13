import React, { FC } from 'react'
import { IMainMenuElement } from './mainMenuElement.interface'

const MainMenuElement: FC<IMainMenuElement> = ({ icon, title }) => {
	return (
		<li>
			{icon}
			<p>{title}</p>
		</li>
	)
}

export default MainMenuElement
