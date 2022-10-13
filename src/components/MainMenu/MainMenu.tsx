import React from 'react'
import cl from './MainMenu.module.scss'
import { AiFillHome } from 'react-icons/ai'
import { FiTrendingUp } from 'react-icons/fi'
import { AiOutlineHistory } from 'react-icons/ai'
import { AiFillLike } from 'react-icons/ai'
import { MdSubscriptions } from 'react-icons/md'
import { TbPlaylist } from 'react-icons/tb'
import MainMenuElement from '../ui/MainMenuUI/MainMenuElement/MainMenuElement'
import { mainMenuElementConfig } from '../../config/mainMenuElement.config'
import SubscriberCard from '../ui/MainMenuUI/SubscriberCard/SubscriberCard'

const MainMenu = () => {
	return (
		<div className='px-0 py-6 font-semibold w-[290px]'>
			<p className='uppercase text-[#3c3c3c] tracking-wider'>Меню</p>
			<ul className={cl.menu}>
				<div className={cl.menu__body}>
					<MainMenuElement
						icon={<AiFillHome {...mainMenuElementConfig} />}
						title='Главная'
					/>
					<MainMenuElement
						icon={<FiTrendingUp {...mainMenuElementConfig} />}
						title='Тренды'
					/>
					<MainMenuElement
						icon={<AiOutlineHistory {...mainMenuElementConfig} />}
						title='История'
					/>
				</div>
				<div className={cl.menu__body}>
					<MainMenuElement
						icon={<AiFillLike {...mainMenuElementConfig} />}
						title='Понравившиеся'
					/>
					<MainMenuElement
						icon={<MdSubscriptions {...mainMenuElementConfig} />}
						title='Подписки'
					/>
					<MainMenuElement
						icon={<TbPlaylist {...mainMenuElementConfig} />}
						title='Плейлисты'
					/>
				</div>
			</ul>
			<p className='uppercase text-[#3c3c3c] tracking-wider'>Подписки</p>
			<ul className={cl.menu_sub}>
				<SubscriberCard />
				<SubscriberCard />
				<SubscriberCard />
				<SubscriberCard />
			</ul>
		</div>
	)
}

export default MainMenu
