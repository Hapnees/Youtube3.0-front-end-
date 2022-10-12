import {
	isRejectedWithValue,
	Middleware,
	MiddlewareAPI,
} from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { toastConfig } from '../config/toast.config'
import { IError } from '../models/error/error.interface'

export const ErrorHandler: Middleware =
	(api: MiddlewareAPI) => next => action => {
		if (isRejectedWithValue(action)) {
			const errorMessages = (action.payload as IError).data.messages
			if (errorMessages) {
				errorMessages.forEach(message => {
					console.error(message || 'Ошибка')
					toast.error(message || 'Ошибка', toastConfig)
				})
			} else {
				const errorMessage = action.payload.data.message
				if (errorMessage) {
					console.error(errorMessage || 'Ошибка')
					toast.error(errorMessage || 'Ошибка', toastConfig)
				} else {
					console.error('Ошибка')
					toast.error('Ошибка', toastConfig)
				}
			}
		}

		return next(action)
	}
