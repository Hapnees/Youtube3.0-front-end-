import React, { useEffect } from 'react'
import cl from './MainMenu.module.scss'
import SubscriberCard from '../ui/MainMenuUI/SubscriberCard/SubscriberCard'
import MainMenuCategories from './MainMenuCategories/MainMenuCategories'
import { useLazyGetSubscriptionsQuery } from '../../api/user.api'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useActions'
import Loader from '../ui/LoaderUI/Loader'

const MainMenu = () => {
  const { user } = useTypedSelector(state => state.auth)
  const { setSubsriptions } = useActions()
  const [getSubscriptions, { data: subscriptions, isLoading: isLoadingSub }] =
    useLazyGetSubscriptionsQuery()

  // Получаем подписчиков
  useEffect(() => {
    if (user.token) {
      getSubscriptions({ token: user.token })
    }
  }, [user.token])

  // Обновление redux-state subscriptions
  useEffect(() => {
    if (subscriptions) setSubsriptions(subscriptions.map(sub => sub.username))
  }, [subscriptions])

  return (
    <div className={cl.container}>
      <div className='w-[230px]'>
        <MainMenuCategories />
        {!!user.token?.length && (
          <div className='pl-2'>
            <p className='uppercase text-[#3c3c3c] tracking-wider'>Подписки</p>
            {isLoadingSub ?
              <Loader />
              :
              <ul className={cl.menu_subscribers}>
                {subscriptions &&
                  user.token &&
                  subscriptions.map(sub => (
                    <SubscriberCard key={sub.username} sub={sub} />
                  ))}
              </ul>
            }
          </div>
        )}
      </div>
    </div>
  )
}

export default MainMenu
