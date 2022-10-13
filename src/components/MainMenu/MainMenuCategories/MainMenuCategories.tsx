import React, { useEffect, useState } from 'react'
import { AiFillHome, AiFillLike, AiOutlineHistory } from 'react-icons/ai'
import { FiTrendingUp } from 'react-icons/fi'
import { MdSubscriptions } from 'react-icons/md'
import { TbPlaylist } from 'react-icons/tb'

import { mainMenuElementConfig } from '../../../config/mainMenuElement.config'
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import MainMenuElement from '../../ui/MainMenuUI/MainMenuElementComponent/MainMenuElement'
import cl from './MainMenuCategories.module.scss'

const MainMenuCategories = () => {
	const { category } = useTypedSelector(state => state.mainMenuCategories)
	const { setChecks } = useActions()
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

	// Заносим данные из mainMenuCategoriesSlice в menu при первом запуске
	useEffect(() => {
		const _menu = menu.map(el => ({
			...el,
			isChecked: category.find(_el => _el.id === el.id)?.isChecked || false,
		}))
		setMenu(_menu)
	}, [])

	// Заносим данные в mainMenuCategoriesSlice при изменении menu
	useEffect(() => {
		const _menu = menu.map(el => ({ id: el.id, isChecked: el.isChecked }))
		setChecks(_menu)
	}, [menu])

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
