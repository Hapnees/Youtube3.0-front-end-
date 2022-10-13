import React from 'react'
import profileIcon from '../../../../assets/img/profile.png'
import cl from './SubscriberCard.module.scss'

const SubscriberCard = () => {
	return (
		<li className={cl.container}>
			<img
				src={profileIcon}
				alt='profile__icon'
				width={30}
				className='rounded-full'
			/>
			<p>Влад Бумага</p>
		</li>
	)
}

export default SubscriberCard
