import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useRefreshMutation } from '../api/auth.api'
import Header from '../components/Header/Header'
import { toastConfig } from '../config/toast.config'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'

const MainLayout = () => {
	const {
		user: { token },
	} = useTypedSelector(state => state.auth)
	const [refresh, { data: refreshData }] = useRefreshMutation()
	const { setAuthUser, removeUser } = useActions()
	const isAuth = !!token

	// Обновление токена
	useEffect(() => {
		setInterval(() => {
			refresh(token)
			if (refreshData) {
				setAuthUser(refreshData)
			} else {
				removeUser()
				toast.error('Пользователь не найден', toastConfig)
			}
		}, 840_000)
	}, [isAuth])

	return (
		<div>
			<Header />
			<Outlet />
		</div>
	)
}

export default MainLayout
