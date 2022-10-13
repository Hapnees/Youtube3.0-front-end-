import React, { useEffect, useMemo } from 'react'
import { Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useRefreshMutation } from '../../api/auth.api'
import Header from '../../components/Header/Header'
import MainMenu from '../../components/MainMenu/MainMenu'
import cl from './MainLayout.module.scss'

const MainLayout = () => {
	return (
		<div>
			<Header />
			<div className={cl.container}>
				<MainMenu />
				<Outlet />
			</div>
		</div>
	)
}

export default MainLayout
