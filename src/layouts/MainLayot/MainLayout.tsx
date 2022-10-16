import React from 'react'
import { Outlet } from 'react-router-dom'
import AddVideoWindow from '../../components/AddVideo/AddVideoWindow'
import Header from '../../components/Header/Header'
import MainMenu from '../../components/MainMenu/MainMenu'
import ModalWindow from '../../components/ui/ModalUI/ModalWindow'
import { CSSTransition } from 'react-transition-group'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useActions'

const MainLayout = () => {
	const { isOpen: isOpenModalWindow } = useTypedSelector(
		state => state.modalWindow
	)

	const { setIsOpenModalWindow } = useActions()

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Escape') {
			setIsOpenModalWindow(false)
		}
	}

	return (
		<div onKeyDown={event => handleKeyDown(event)} tabIndex={0}>
			<CSSTransition
				in={isOpenModalWindow}
				timeout={300}
				unmountOnExit
				classNames='modal'
			>
				<ModalWindow>
					<AddVideoWindow />
				</ModalWindow>
			</CSSTransition>
			<Header />
			<div className='flex'>
				<MainMenu />
				<Outlet />
			</div>
		</div>
	)
}

export default MainLayout
