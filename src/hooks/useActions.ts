import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { authActions } from '../redux/slices/auth.slice'
import { mainMenuCategoriesActions } from '../redux/slices/mainMenuCategories.slice'
import { modalWindowActions } from '../redux/slices/modalWindow.slice'

const allActions = {
	...authActions,
	...mainMenuCategoriesActions,
	...modalWindowActions,
}

export const useActions = () => {
	const dispatch = useDispatch()

	return bindActionCreators(allActions, dispatch)
}
