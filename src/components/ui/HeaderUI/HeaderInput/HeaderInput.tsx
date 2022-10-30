import React, { FC, useState } from 'react'
import cl from './HeaderInput.module.scss'
import { AiOutlineSearch } from 'react-icons/ai'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useActions } from '../../../../hooks/useActions'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'

const HedaerInput: FC<React.HTMLProps<HTMLInputElement>> = props => {
  const { setSearch } = useActions()
  const { search } = useTypedSelector(state => state.input)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [value, setValue] = useState(searchParams.get('search') || '')

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (value === search) return

      setSearch(value)
      navigate('/')
    }
  }

  const handleClickSearch = () => {
    if (value === search) return

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
        className={cl.search}
        size={22}
        color='gray'
        onClick={handleClickSearch}
      />
    </div>
  )
}

export default HedaerInput
