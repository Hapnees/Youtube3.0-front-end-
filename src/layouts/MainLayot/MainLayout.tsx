import React from 'react'
import { Outlet } from 'react-router-dom'
import AddVideoWindow from '../../components/AddVideo/AddVideoWindow'
import Header from '../../components/Header/Header'
import MainMenu from '../../components/MainMenu/MainMenu'
import ModalWindow from '../../components/ui/ModalUI/ModalWindow'
import { CSSTransition } from 'react-transition-group'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useActions'
import EditVideoWindow from '../../components/EditVideoWindow/EditVideo'

const MainLayout = () => {
	const {
		isOpen: isOpenModalWindow,
		type: typeModalWindow,
		data: modalData,
	} = useTypedSelector(state => state.modalWindow)

	const { setIsOpenModalWindow } = useActions()

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Escape') {
			setIsOpenModalWindow({ isOpen: false })
		}
	}

	const modalWindow = () => {
		switch (typeModalWindow) {
			case 'add':
				return <AddVideoWindow />
			case 'edit':
				return <EditVideoWindow video={modalData} />
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
				<ModalWindow>{modalWindow()}</ModalWindow>
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
