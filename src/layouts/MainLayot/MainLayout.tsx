import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useRefreshMutation } from '../../api/auth.api'
import Header from '../../components/Header/Header'
import MainMenu from '../../components/MainMenu/MainMenu'
import { toastConfig } from '../../config/toast.config'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import cl from './MainLayout.module.scss'

const MainLayout = () => {
	const {
		user: { token },
	} = useTypedSelector(state => state.auth)
	const [refresh, { data: refreshData, isError }] = useRefreshMutation()
	const { setAuthUser, removeUser } = useActions()
	const isAuth = !!token

	// Обновление токена
	useEffect(() => {
		if (isAuth) {
			const refreshInterval = setInterval(() => {
				if (!isAuth) {
					clearInterval(refreshInterval)
				}
				refresh(token)
				if (isError) {
					removeUser()
					toast.error('Пользователь не найден', toastConfig)
					clearInterval(refreshInterval)
				}
			}, 900_000)
		}
	}, [isAuth])

	// Заносим данные в auth при обновлении токена
	useEffect(() => {
		if (refreshData) {
			setAuthUser(refreshData)
		}
	}, [refreshData])

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
