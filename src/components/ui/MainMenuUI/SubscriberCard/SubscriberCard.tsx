import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import profileIcon from '../../../../assets/img/profile.png'
import cl from './SubscriberCard.module.scss'

interface ISubscriberCard {
	sub: {
		username: string
		avatar_path: string
	}
}

const SubscriberCard: FC<ISubscriberCard> = ({
	sub: { username, avatar_path },
}) => {
	return (
		<Link to={`/user/${username}`}>
			<li className={cl.container}>
				<img
					src={avatar_path || profileIcon}
					alt='profile__icon'
					width={35}
					className='rounded-full'
				/>
				<p>{username}</p>
			</li>
		</Link>
	)
}

export default SubscriberCard
