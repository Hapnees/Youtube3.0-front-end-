import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
	isOpen: boolean
}

const initialState: IState = { isOpen: false }

export const modalWindowSlice = createSlice({
	name: 'modalWindow',
	initialState,
	reducers: {
		setIsOpenModalWindow: (state, action: PayloadAction<boolean>) => {
			state.isOpen = action.payload
		},
	},
})

export const modalWindowReducer = modalWindowSlice.reducer
export const modalWindowActions = modalWindowSlice.actions
