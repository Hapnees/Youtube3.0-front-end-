import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { authActions } from '../redux/slices/auth.slice'
import { mainMenuCategoriesActions } from '../redux/slices/mainMenuCategories.slice'

const allActions = {
	...authActions,
	...mainMenuCategoriesActions,
}

export const useActions = () => {
	const dispatch = useDispatch()

	return bindActionCreators(allActions, dispatch)
}
