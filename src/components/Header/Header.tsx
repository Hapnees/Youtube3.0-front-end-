import React, { useState } from 'react'
import HedaerInput from '../ui/HeaderUI/HeaderInput/HeaderInput'
import HeaderMenu from './HeaderMenu/HeaderMenu'
import cl from './Header.module.scss'
import LoginButton from '../ui/HeaderUI/LoginButton/LoginButton'
import LoginForm from '../AuthForm/LoginForm/LoginForm'
import { CSSTransition } from 'react-transition-group'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { Link } from 'react-router-dom'

const Header = () => {
	const {
		user: { token },
	} = useTypedSelector(state => state.auth)
	const isAuth = !!token

	const [isClickedLoginButton, setIsClickedLoginButton] =
		useState<boolean>(false)

	return (
		<div className={cl.wrapper}>
			<div className={cl.container}>
				<div className={cl.section__1}>
					<Link to='/'>
						<p className='font-bold text-3xl'>Youtube 3.0</p>
					</Link>
				</div>

				<div className={cl.section__2}>
					<HedaerInput placeholder='Поиск...' />

					{isAuth ? (
						<HeaderMenu />
					) : (
						<div className='relative'>
							<LoginButton
								isClickedLoginButton={isClickedLoginButton}
								onClick={() => setIsClickedLoginButton(!isClickedLoginButton)}
							/>
							<CSSTransition
								in={isClickedLoginButton}
								timeout={300}
								unmountOnExit
								classNames='auth'
							>
								<LoginForm setIsClickedLoginButton={setIsClickedLoginButton} />
							</CSSTransition>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Header
