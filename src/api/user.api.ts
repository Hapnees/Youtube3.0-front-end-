import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ILoginGet } from '../models/login/login-get.interface'
import { IUserGet } from '../models/user/user-get.interface'
import { IUserUpdate } from '../models/user/user-update.interface'

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:4000/api/user/profile',
	}),
	endpoints: build => ({
		getProfile: build.query<IUserGet, string>({
			query: token => ({
				url: '/',
				headers: { Authorization: `Bearer ${token}` },
			}),
		}),

		updateProfile: build.mutation<
			{ username: string; email: string },
			{ token: string; userData: IUserUpdate }
		>({
			query: ({ token, userData }) => ({
				url: 'update',
				method: 'PUT',
				headers: { Authorization: `Bearer ${token}` },
				body: userData,
			}),
		}),
	}),
})

export const { useGetProfileQuery, useUpdateProfileMutation } = userApi
