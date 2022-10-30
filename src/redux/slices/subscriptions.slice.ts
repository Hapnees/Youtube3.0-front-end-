import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
  subscriptions: string[]
}

const initialState: IState = { subscriptions: [] }

export const subscripSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {
    setSubsriptions: (state, action: PayloadAction<string[]>) => {
      state.subscriptions = action.payload
    }
  }
})

export const subscripReducer = subscripSlice.reducer
export const subscripActions = subscripSlice.actions
