import React from 'react'
import cl from './ProfilePage.module.scss'
import profileIcon from '../../assets/img/profile.png'

const ProfilePage = () => {
	return (
		<div className='grow'>
			<div className={cl.header}></div>

			<div className={cl.info}>
				<div className='flex items-center h-full mx-20'>
					<img src={profileIcon} alt='profileIcon' width={30} />
				</div>
			</div>
		</div>
	)
}

export default ProfilePage
