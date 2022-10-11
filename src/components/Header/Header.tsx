import React from 'react'
import HedaerInput from '../ui/HeaderInput/HeaderInput'
import HeaderMenu from './HeaderMenu/HeaderMenu'
import cl from './Header.module.scss'

const Header = () => {
	return (
		<div className={cl.wrapper}>
			<div className={cl.container}>
				<div className={cl.section__1}>
					<p className='font-bold text-3xl'>Youtube 3.0</p>
				</div>

				<div className={cl.section__2}>
					<HedaerInput placeholder='Поиск...' />
					<HeaderMenu />
				</div>
			</div>
		</div>
	)
}

export default Header
