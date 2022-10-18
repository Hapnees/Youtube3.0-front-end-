import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
	search: string
}

const initialState: IState = { search: '' }

export const inputSlice = createSlice({
	name: 'inputSlice',
	initialState,
	reducers: {
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload
		},
	},
})

export const inputReducer = inputSlice.reducer
export const inputActions = inputSlice.actions
