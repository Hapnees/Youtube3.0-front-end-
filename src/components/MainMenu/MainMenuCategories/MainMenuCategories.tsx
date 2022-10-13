import React, { useState } from 'react'
import { AiFillHome, AiFillLike, AiOutlineHistory } from 'react-icons/ai'
import { FiTrendingUp } from 'react-icons/fi'
import { MdSubscriptions } from 'react-icons/md'
import { TbPlaylist } from 'react-icons/tb'

import { mainMenuElementConfig } from '../../../config/mainMenuElement.config'
import MainMenuElement from '../../ui/MainMenuUI/MainMenuElementComponent/MainMenuElement'
import cl from './MainMenuCategories.module.scss'

const MainMenuCategories = () => {
	const detailClass = 'bg-[#c33636] text-white'
	const [menu, setMenu] = useState([
		{
			id: 1,
			menuElement: function () {
				return (
					<MainMenuElement
						key={this.id}
						id={this.id}
						icon={
							<AiFillHome
								{...mainMenuElementConfig(this.isChecked ? detailClass : '')}
							/>
						}
						title='Главная'
						isChecked={this.isChecked}
						onClick={handleClickMainMenuItem}
					/>
				)
			},
			isChecked: false,
		},
		{
			id: 2,
			menuElement: function () {
				return (
					<MainMenuElement
						key={this.id}
						id={this.id}
						icon={
							<FiTrendingUp
								{...mainMenuElementConfig(this.isChecked ? detailClass : '')}
							/>
						}
						title='Тренды'
						isChecked={this.isChecked}
						onClick={handleClickMainMenuItem}
					/>
				)
			},
			isChecked: false,
		},
		{
			id: 3,
			menuElement: function () {
				return (
					<MainMenuElement
						key={this.id}
						id={this.id}
						icon={
							<AiOutlineHistory
								{...mainMenuElementConfig(this.isChecked ? detailClass : '')}
							/>
						}
						title='История'
						isChecked={this.isChecked}
						onClick={handleClickMainMenuItem}
					/>
				)
			},
			isChecked: false,
		},
		{
			id: 4,
			menuElement: function () {
				return (
					<MainMenuElement
						key={this.id}
						id={this.id}
						icon={
							<AiFillLike
								{...mainMenuElementConfig(this.isChecked ? detailClass : '')}
							/>
						}
						title='Понравившиеся'
						isChecked={this.isChecked}
						onClick={handleClickMainMenuItem}
					/>
				)
			},
			isChecked: false,
		},
		{
			id: 5,
			menuElement: function () {
				return (
					<MainMenuElement
						key={this.id}
						id={this.id}
						icon={
							<MdSubscriptions
								{...mainMenuElementConfig(this.isChecked ? detailClass : '')}
							/>
						}
						title='Подписки'
						isChecked={this.isChecked}
						onClick={handleClickMainMenuItem}
					/>
				)
			},
			isChecked: false,
		},
		{
			id: 6,
			menuElement: function () {
				return (
					<MainMenuElement
						key={this.id}
						id={this.id}
						icon={
							<TbPlaylist
								{...mainMenuElementConfig(this.isChecked ? detailClass : '')}
							/>
						}
						title='Плейлисты'
						isChecked={this.isChecked}
						onClick={handleClickMainMenuItem}
					/>
				)
			},
			isChecked: false,
		},
	])

	const handleClickMainMenuItem = (id: number) => {
		const copy = menu.map(el =>
			el.id === id ? { ...el, isChecked: true } : { ...el, isChecked: false }
		)
		setMenu(copy)
	}

	return (
		<>
			<p className='uppercase text-[#3c3c3c] tracking-wider pl-2'>Меню</p>
			<ul className={cl.menu}>
				{menu.slice(0, 3).map(el => el.menuElement())}
			</ul>
			<ul className={cl.menu}>{menu.slice(3).map(el => el.menuElement())}</ul>
		</>
	)
}

export default MainMenuCategories
