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
			state.user.id = action.payload.id || state.user.id
			state.user.username = action.payload.username || state.user.username
			state.user.email = action.payload.email || state.user.email
			state.user.token = action.payload.token || state.user.token
			state.user.avatarPath = action.payload.avatarPath || state.user.avatarPath
		},
		removeUser: state => {
			state.user = { email: '', username: '', token: '', avatarPath: '', id: 0 }
		},
	},
})

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions
