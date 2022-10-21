import React from 'react'
import { AiFillHome, AiFillLike, AiOutlineHistory } from 'react-icons/ai'
import { FiTrendingUp } from 'react-icons/fi'
import { MdSubscriptions } from 'react-icons/md'
import { TbPlaylist } from 'react-icons/tb'
import { useLocation, useNavigate } from 'react-router-dom'

import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import cl from './MainMenuCategories.module.scss'

const MainMenuCategories = () => {
	const { category } = useTypedSelector(state => state.mainMenuCategories)
	const { setCategory: setChecks } = useActions()
	const navigate = useNavigate()
	const location = useLocation()

	return (
		<>
			<p className='uppercase text-[#3c3c3c] tracking-wider pl-2'>Меню</p>
			<div className={cl.menu}>
				<input
					type='radio'
					name='category'
					id='general'
					value='general'
					checked={category === 'general' && location.pathname === '/'}
					onChange={() => setChecks('general')}
				/>
				<label htmlFor='general' onClick={() => navigate('/')}>
					<AiFillHome className={cl.icon} />
					<p>Главная</p>
				</label>

				<input
					type='radio'
					name='category'
					id='trends'
					value='trends'
					checked={category === 'trends' && location.pathname === '/'}
					onChange={() => setChecks('trends')}
				/>
				<label htmlFor='trends' onClick={() => navigate('/')}>
					<FiTrendingUp className={cl.icon} />
					<p>Тренды</p>
				</label>

				<input
					type='radio'
					name='category'
					id='history'
					value='history'
					checked={category === 'history' && location.pathname === '/'}
					onChange={() => setChecks('history')}
				/>
				<label htmlFor='history' onClick={() => navigate('/')}>
					<AiOutlineHistory className={cl.icon} />
					<p>История</p>
				</label>
			</div>

			<div className={cl.menu}>
				<input
					type='radio'
					name='category'
					id='liked'
					value='liked'
					checked={category === 'liked' && location.pathname === '/'}
					onChange={() => setChecks('liked')}
				/>
				<label htmlFor='liked' onClick={() => navigate('/')}>
					<AiFillLike className={cl.icon} />
					<p>Понравившиеся</p>
				</label>

				<input
					type='radio'
					name='category'
					id='subscrip'
					value='subscrip'
					checked={category === 'subscrip' && location.pathname === '/'}
					onChange={() => setChecks('subscrip')}
				/>
				<label htmlFor='subscrip' onClick={() => navigate('/')}>
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
