import React, { FC, useEffect, useState } from 'react'
import cl from './HeaderInput.module.scss'
import { AiOutlineSearch } from 'react-icons/ai'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useActions } from '../../../../hooks/useActions'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'

const HedaerInput: FC<React.HTMLProps<HTMLInputElement>> = props => {
	const { setSearch } = useActions()
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const [value, setValue] = useState(searchParams.get('search') || '')

	// Заносим данные из адресной строки в redux-state
	useEffect(() => {
		setSearch(searchParams.get('search') || '')
	}, [])

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter') {
			if (!searchParams.get('search')) navigate('/')
			setSearch(value)
		}
	}

	const handleClickSearch = () => {
		if (!searchParams.get('search')) navigate('/')
		setSearch(value)
	}

	return (
		<div className='relative'>
			<input
				type='text'
				className={cl.input}
				{...props}
				value={value}
				onChange={event => setValue(event.target.value)}
				onKeyDown={event => handleKeyDown(event)}
			/>
			<AiOutlineSearch
				className='absolute right-[10px] top-[10px] cursor-pointer'
				size={22}
				color='gray'
				onClick={handleClickSearch}
			/>
		</div>
	)
}

export default HedaerInput
