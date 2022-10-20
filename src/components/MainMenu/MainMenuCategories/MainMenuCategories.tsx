import React from 'react'
import { AiFillHome, AiFillLike, AiOutlineHistory } from 'react-icons/ai'
import { FiTrendingUp } from 'react-icons/fi'
import { MdSubscriptions } from 'react-icons/md'
import { TbPlaylist } from 'react-icons/tb'

import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import cl from './MainMenuCategories.module.scss'

const MainMenuCategories = () => {
	const { category } = useTypedSelector(state => state.mainMenuCategories)
	const { setChecks } = useActions()

	return (
		<>
			<p className='uppercase text-[#3c3c3c] tracking-wider pl-2'>Меню</p>
			<div className={cl.menu}>
				<input
					type='radio'
					name='category'
					id='general'
					value='general'
					checked={category === 'general'}
					onChange={() => setChecks('general')}
				/>
				<label htmlFor='general'>
					<AiFillHome className={cl.icon} />
					<p>Главная</p>
				</label>

				<input
					type='radio'
					name='category'
					id='trends'
					value='trends'
					checked={category === 'trends'}
					onChange={() => setChecks('trends')}
				/>
				<label htmlFor='trends'>
					<FiTrendingUp className={cl.icon} />
					<p>Тренды</p>
				</label>

				<input
					type='radio'
					name='category'
					id='history'
					value='history'
					checked={category === 'history'}
					onChange={() => setChecks('history')}
				/>
				<label htmlFor='history'>
					<AiOutlineHistory className={cl.icon} />
					<p>Тренды</p>
				</label>
			</div>

			<div className={cl.menu}>
				<input
					type='radio'
					name='category'
					id='liked'
					value='liked'
					checked={category === 'liked'}
					onChange={() => setChecks('liked')}
				/>
				<label htmlFor='liked'>
					<AiFillLike className={cl.icon} />
					<p>Понравившиеся</p>
				</label>

				<input
					type='radio'
					name='category'
					id='subscrip'
					value='subscrip'
					checked={category === 'subscrip'}
					onChange={() => setChecks('subscrip')}
				/>
				<label htmlFor='subscrip'>
					<MdSubscriptions className={cl.icon} />
					<p>Подписки</p>
				</label>

				<input
					type='radio'
					name='category'
					id='playlists'
					value='playlists'
					checked={category === 'playlists'}
					onChange={() => setChecks('playlists')}
				/>
				<label htmlFor='playlists'>
					<TbPlaylist className={cl.icon} />
					<p>Плейлисты</p>
				</label>
			</div>
		</>
	)
}

export default MainMenuCategories
