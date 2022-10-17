import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
	isOpen: boolean
	type?: 'add' | 'edit'
	data?: any
}

const initialState: IState = { isOpen: false, type: 'add' }

export const modalWindowSlice = createSlice({
	name: 'modalWindow',
	initialState,
	reducers: {
		setIsOpenModalWindow: (state, action: PayloadAction<IState>) => {
			state.isOpen = action.payload.isOpen
			state.type = action.payload.type
			state.data = action.payload.data
		},
	},
})

export const modalWindowReducer = modalWindowSlice.reducer
export const modalWindowActions = modalWindowSlice.actions
