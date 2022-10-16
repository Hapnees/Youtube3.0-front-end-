import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ILoginGet } from '../models/login/login-get.interface'
import { IUserGet } from '../models/user/user-get.interface'
import { IUserUpdate } from '../models/user/user-update.interface'

export const userApi = createApi({
	reducerPath: 'userApi',
	tagTypes: ['User'],
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:4000/api/user',
	}),
	endpoints: build => ({
		getProfile: build.query<IUserGet, string>({
			query: token => ({
				url: 'profile',
				headers: { Authorization: `Bearer ${token}` },
			}),
			providesTags: ['User'],
		}),

		getProfileByUsername: build.query<IUserGet, string>({
			query: username => ({
				url: `/${username}`,
			}),
			providesTags: ['User'],
		}),

		getProfileById: build.query<IUserGet, number>({
			query: id => ({
				url: '/',
				params: { id },
			}),
		}),

		updateProfile: build.mutation<
			{ username: string; email: string },
			{ token: string; userData: IUserUpdate }
		>({
			query: ({ token, userData }) => ({
				url: 'profile/update',
				method: 'PUT',
				headers: { Authorization: `Bearer ${token}` },
				body: userData,
			}),
			invalidatesTags: result => [{ type: 'User', username: result?.username }],
		}),
	}),
})

export const {
	useGetProfileQuery,
	useUpdateProfileMutation,
	useGetProfileByUsernameQuery,
	useLazyGetProfileByIdQuery,
	useGetProfileByIdQuery,
} = userApi
