import React, { FC, useEffect, useState } from 'react'
import cl from './HeaderInput.module.scss'
import { AiOutlineSearch } from 'react-icons/ai'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useLazySearchVideosQuery } from '../../../../api/user.api'
import { useActions } from '../../../../hooks/useActions'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'

const HedaerInput: FC<React.HTMLProps<HTMLInputElement>> = props => {
	const [value, setValue] = useState('')
	const navigate = useNavigate()
	const { setSearch } = useActions()
	const [searchParams] = useSearchParams()

	// Заносим параметры в input
	useEffect(() => {
		const _value = searchParams.get('search')
		if (_value) {
			setValue(_value)
		}
	}, [])

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter') {
			setSearch(value)
			navigate('/')
		}
	}

	const handleClickSearch = () => {
		setSearch(value)
		navigate('/')
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
