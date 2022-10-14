import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IRegisterSend } from '../models/register/register-send.interface'
import { IRegisterGet } from '../models/register/register-get.interface'
import { ILoginGet } from '../models/login/login-get.interface'
import { ILoginSend } from '../models/login/login-send.interface'

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api' }),
	endpoints: build => ({
		register: build.mutation<IRegisterGet, IRegisterSend>({
			query: body => ({
				url: 'auth/register',
				method: 'POST',
				body,
			}),
		}),
		login: build.mutation<ILoginGet, ILoginSend>({
			query: body => ({
				url: 'auth/login',
				method: 'POST',
				body,
			}),
		}),
		// refresh: build.mutation<ILoginGet, string>({
		// 	query: token => ({
		// 		url: 'auth/refresh',
		// 		method: 'POST',
		// 		headers: {
		// 			Authorization: `Bearer ${token}`,
		// 		},
		// 	}),
		// }),
	}),
})

export const { useRegisterMutation, useLoginMutation } = authApi
