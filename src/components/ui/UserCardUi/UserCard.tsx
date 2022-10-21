import React, { FC } from 'react'
import { numberFormat } from '../../../utils/number.format'
import { subscribersFormat } from '../../../utils/subscribers.format'
import cl from './UserCard.module.scss'
import { FaUserAlt } from 'react-icons/fa'

interface IUserCard {
	user: {
		username: string
		avatar_path: string
		subscribers_count: number
		description: string
	}
}

const UserCard: FC<IUserCard> = ({ user }) => {
	return (
		<div className={cl.container}>
			<div className='flex flex-col gap-4 items-center'>
				<div className='inline-flex items-center gap-3 justify-center'>
					{user.avatar_path ? (
						<img
							src={user.avatar_path}
							alt=''
							className='w-[60px] h-[60px] rounded-full'
						/>
					) : (
						<FaUserAlt className='w-[70px] h-[70px] rounded-full border-2 p-2' />
					)}
					<p className='text-[25px] tracking-wider'>{user.username}</p>
				</div>
				<div className='flex gap-1 text-zinc-400 text-[20px]'>
					<p>{numberFormat(user.subscribers_count || 0)}</p>
					<p>{subscribersFormat(user.subscribers_count || 0)}</p>
				</div>
			</div>
			<p className={cl.description}>{user.description}</p>
		</div>
	)
}

export default UserCard
