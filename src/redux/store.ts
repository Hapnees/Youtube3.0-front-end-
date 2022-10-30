import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import persistReducer from 'redux-persist/es/persistReducer'
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import { authSlice } from './slices/auth.slice'
import { ErrorHandler } from '../middleware/error-handler.middleware'
import {
  mainMenuCategoriesReducer,
  mainMenuCategoriesSlice
} from './slices/mainMenuCategories.slice'
import { userApi } from '../api/user.api'
import { modalWindowReducer } from './slices/modalWindow.slice'
import { inputSlice } from './slices/input.slice'
import { subscripReducer } from './slices/subscriptions.slice'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: [authSlice.name, mainMenuCategoriesSlice.name]
}

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  input: inputSlice.reducer,
  auth: authSlice.reducer,
  mainMenuCategories: mainMenuCategoriesReducer,
  modalWindow: modalWindowReducer,
  subscriptions: subscripReducer
})

export const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          authSlice.actions.removeUser.toString()
        ]
      }
    }).concat([userApi.middleware, ErrorHandler])
})

export default store

export type TypeRootState = ReturnType<typeof store.getState>
export type TypeDispatch = typeof store.dispatch
