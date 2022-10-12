import { Zoom } from 'react-toastify'

export const toastConfig = {
	position: 'top-center',
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: 'colored',
}

export const toastContainerConfig = {
	position: 'top-center',
	autoClose: 5000,
	hideProgressBar: false,
	newestOnTop: true,
	closeOnClick: true,
	rtl: false,
	pauseOnFocusLoss: true,
	draggable: true,
	pauseOnHover: true,
	transition: Zoom,
	limit: 3,
	theme: 'colored',
}
