import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
	duration: number
}

const initialState: IState = { duration: 0 }

export const durationSlice = createSlice({
	name: 'duration',
	initialState,
	reducers: {
		setDuration: (state, action: PayloadAction<number>) => {
			state.duration = action.payload
		},
	},
})

export const durationReducer = durationSlice.reducer
export const durationActions = durationSlice.actions
