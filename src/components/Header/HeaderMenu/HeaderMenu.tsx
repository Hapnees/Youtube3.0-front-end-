import React, { useState } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { MdKeyboardArrowDown } from 'react-icons/md'
import PopupMenu from '../PopupMenu/PopupMenu'
import cl from './HeaderMenu.module.scss'

const HeaderMenu = () => {
	const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false)

	return (
		<div className={cl.container}>
			<FaUserAlt
				className='border border-white p-1 rounded-full cursor-pointer'
				size={40}
			/>

			<div className='relative'>
				<div className={cl.username__container}>
					<p className='font-semibold'>Thomas</p>
					<MdKeyboardArrowDown size={18} />
				</div>
				<PopupMenu />
			</div>
		</div>
	)
}

export default HeaderMenu
