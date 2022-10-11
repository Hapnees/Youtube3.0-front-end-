import React from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { MdKeyboardArrowDown } from 'react-icons/md'

const HeaderMenu = () => {
	return (
		<div className='flex items-center gap-3'>
			<FaUserAlt
				className='border border-white p-1 rounded-full cursor-pointer'
				size={40}
			/>
			<div className='flex items-center gap-1 px-2 cursor-pointer hover:bg-white hover:text-black rounded-md duration-300'>
				<p className='font-semibold'>Thomas</p>
				<MdKeyboardArrowDown size={18} />
			</div>
		</div>
	)
}

export default HeaderMenu
