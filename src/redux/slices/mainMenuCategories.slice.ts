import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
	category: string
}

const initialState: IState = { category: 'general' }

export const mainMenuCategoriesSlice = createSlice({
	name: 'mainMenuCategories',
	initialState,
	reducers: {
		setCategory: (state, action: PayloadAction<string>) => {
			state.category = action.payload
		},
	},
})

export const mainMenuCategoriesReducer = mainMenuCategoriesSlice.reducer
export const mainMenuCategoriesActions = mainMenuCategoriesSlice.actions
