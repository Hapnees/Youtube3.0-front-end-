import React, { FC } from 'react'
import cl from './HeaderInput.module.scss'
import { AiOutlineSearch } from 'react-icons/ai'

const HedaerInput: FC<React.HTMLProps<HTMLInputElement>> = props => {
	return (
		<div className='relative'>
			<input type='text' className={cl.input} {...props} />
			<AiOutlineSearch
				className='absolute right-[10px] top-[10px]'
				size={22}
				color='gray'
			/>
		</div>
	)
}

export default HedaerInput
