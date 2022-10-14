import React from 'react'
import cl from './MainMenu.module.scss'
import SubscriberCard from '../ui/MainMenuUI/SubscriberCard/SubscriberCard'
import MainMenuCategories from './MainMenuCategories/MainMenuCategories'

const MainMenu = () => {
	return (
		<div className={cl.container}>
			<div className='w-[230px]'>
				<MainMenuCategories />
				<div className='pl-2'>
					<p className='uppercase text-[#3c3c3c] tracking-wider'>Подписки</p>
					<ul className={cl.menu_subscribers}>
						<SubscriberCard />
						<SubscriberCard />
						<SubscriberCard />
						<SubscriberCard />
					</ul>
				</div>
			</div>
		</div>
	)
}

export default MainMenu
