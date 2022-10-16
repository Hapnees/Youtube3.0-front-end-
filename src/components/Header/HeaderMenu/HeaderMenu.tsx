import React, { useState } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import PopupMenu from '../PopupMenu/PopupMenu'
import cl from './HeaderMenu.module.scss'
import { CSSTransition } from 'react-transition-group'
import { Link } from 'react-router-dom'

const HeaderMenu = () => {
	const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false)
	const {
		user: { username, avatarPath },
	} = useTypedSelector(state => state.auth)

	return (
		<div className={cl.container}>
			{avatarPath ? (
				<Link to='/profile'>
					<img
						src={avatarPath}
						alt=''
						width={50}
						className='border-2 p-1 border-dashed border-transparent object-cover rounded-full hover:border-blue-400 hover:scale-110 duration-300 cursor-pointer'
					/>
				</Link>
			) : (
				<FaUserAlt
					className='border border-white p-1 rounded-full cursor-pointer'
					size={40}
				/>
			)}

			<div className='relative'>
				<div
					className={cl.username__container}
					onClick={() => setIsOpenPopup(!isOpenPopup)}
				>
					<p className='font-semibold tracking-wide'>{username}</p>
					{isOpenPopup ? (
						<MdKeyboardArrowDown size={18} className='rotate-180' />
					) : (
						<MdKeyboardArrowDown size={18} />
					)}
				</div>

				<CSSTransition
					in={isOpenPopup}
					timeout={300}
					unmountOnExit
					classNames='popup'
				>
					<PopupMenu setIsOpen={setIsOpenPopup} />
				</CSSTransition>
			</div>
		</div>
	)
}

export default HeaderMenu
