import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface item {
	id: number
	isChecked: boolean
}

interface IState {
	category: item[]
}

const initialState: IState = {
	category: [
		{ id: 1, isChecked: true },
		{ id: 2, isChecked: false },
		{ id: 3, isChecked: false },
		{ id: 4, isChecked: false },
		{ id: 5, isChecked: false },
		{ id: 6, isChecked: false },
	],
}

export const mainMenuCategoriesSlice = createSlice({
	name: 'mainMenuCategories',
	initialState,
	reducers: {
		setChecks: (state, action: PayloadAction<item[]>) => {
			state.category = action.payload
		},
	},
})

export const mainMenuCategoriesReducer = mainMenuCategoriesSlice.reducer
export const mainMenuCategoriesActions = mainMenuCategoriesSlice.actions
