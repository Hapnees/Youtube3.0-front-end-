import React, { useEffect } from 'react'
import cl from './MainMenu.module.scss'
import SubscriberCard from '../ui/MainMenuUI/SubscriberCard/SubscriberCard'
import MainMenuCategories from './MainMenuCategories/MainMenuCategories'
import { useLazyGetSubscriptionsQuery } from '../../api/user.api'
import { useTypedSelector } from '../../hooks/useTypedSelector'

const MainMenu = () => {
	const { user } = useTypedSelector(state => state.auth)
	const [getSubscriptions, { data: subscriptions }] =
		useLazyGetSubscriptionsQuery()

	useEffect(() => {
		if (user.token) {
			getSubscriptions({ token: user.token })
		}
	}, [user.token])

	return (
		<div className={cl.container}>
			<div className='w-[230px]'>
				<MainMenuCategories />
				<div className='pl-2'>
					<p className='uppercase text-[#3c3c3c] tracking-wider'>Подписки</p>
					<ul className={cl.menu_subscribers}>
						{subscriptions &&
							subscriptions.map(sub => (
								<SubscriberCard key={sub.username} sub={sub} />
							))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default MainMenu
