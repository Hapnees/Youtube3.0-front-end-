import React, { useState } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import PopupMenu from '../PopupMenu/PopupMenu'
import cl from './HeaderMenu.module.scss'

const HeaderMenu = () => {
	const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false)
	const {
		user: { username },
	} = useTypedSelector(state => state.auth)

	return (
		<div className={cl.container}>
			<FaUserAlt
				className='border border-white p-1 rounded-full cursor-pointer'
				size={40}
			/>

			<div className='relative'>
				<div className={cl.username__container}>
					<p className='font-semibold'>{username}</p>
					<MdKeyboardArrowDown size={18} />
				</div>
				<PopupMenu />
			</div>
		</div>
	)
}

export default HeaderMenu
