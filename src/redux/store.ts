import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authApi } from '../api/auth.api'
import storage from 'redux-persist/lib/storage'
import persistReducer from 'redux-persist/es/persistReducer'
import {
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist'
import { authSlice } from './slices/auth.slice'
import { ErrorHandler } from '../middleware/error-handler.middleware'
import {
	mainMenuCategoriesReducer,
	mainMenuCategoriesSlice,
} from './slices/mainMenuCategories.slice'

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
	whitelist: [authSlice.name, mainMenuCategoriesSlice.name],
}

const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	auth: authSlice.reducer,
	mainMenuCategories: mainMenuCategoriesReducer,
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
					authSlice.actions.removeUser.toString(),
				],
			},
		}).concat([authApi.middleware, ErrorHandler]),
})

export default store

export type TypeRootState = ReturnType<typeof store.getState>
export type TypeDispatch = typeof store.dispatch
