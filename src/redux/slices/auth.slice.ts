import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAuthSlice } from '../../models/auth/auth.interface'

interface IState {
	user: IAuthSlice
}

const initialState = {} as IState

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthUser: (state, action: PayloadAction<IAuthSlice>) => {
			state.user = action.payload
		},
	},
})

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions
