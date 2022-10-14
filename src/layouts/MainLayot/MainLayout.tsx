import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header'
import MainMenu from '../../components/MainMenu/MainMenu'

const MainLayout = () => {
	return (
		<div>
			<Header />
			<div className='flex'>
				<MainMenu />
				<Outlet />
			</div>
		</div>
	)
}

export default MainLayout
