import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUserGetByUsername } from '../models/user/user-get-byusername.interface'
import { IUserGetSearch } from '../models/user/user-get-search.interface'
import { IUserGet } from '../models/user/user-get.interface'
import { IUserUpdate } from '../models/user/user-update.interface'

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['User', 'VideoPage', 'Comment', 'Subscriptions'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/'
  }),
  endpoints: build => ({
    searchUsers: build.query<
      { users: IUserGetSearch[], total_count: number },
      { username: string, limit?: number, page?: number }
    >({
      query: data => ({
        url: 'user/search',
        params: data
      })
    }),

    getProfile: build.query<IUserGet, string>({
      query: token => ({
        url: 'user/profile',
        headers: { Authorization: `Bearer ${token}` }
      }),
      providesTags: ['User']
    }),

    getProfileByUsernameAuth: build.query<
      IUserGetByUsername,
      { username: string; token: string }
    >({
      query: ({ username, token }) => ({
        url: `user/auth/${username}`,
        headers: { Authorization: `Bearer ${token}` }
      }),
      providesTags: ['User']
    }),

    getProfileByUsername: build.query<
      Omit<IUserGetByUsername, 'is_subscribed'>,
      string
    >({
      query: username => ({
        url: `user/${username}`
      }),
      providesTags: ['User']
    }),

    getProfileById: build.query<IUserGet, number>({
      query: id => ({
        url: '/',
        params: { id }
      })
    }),

    updateProfile: build.mutation<
      { username: string; email: string },
      { token: string; userData: IUserUpdate }
    >({
      query: ({ token, userData }) => ({
        url: 'user/profile/update',
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: userData
      }),
      invalidatesTags: result => [{ type: 'User', username: result?.username }]
    }),

    subscribe: build.mutation<
      { message: string },
      { userId: number; token: string }
    >({
      query: ({ userId, token }) => ({
        url: 'user/subscribe',
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
        body: { userId }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'VideoPage', user_id: arg.userId },
        { type: 'Subscriptions' }
      ]
    }),

    getSubscriptions: build.query<
      { username: string; avatar_path: string }[],
      { token: string; limit?: number }
    >({
      query: ({ token, limit }) => ({
        url: 'user/subscriptions',
        headers: { Authorization: `Bearer ${token}` },
        params: { limit }
      }),
      providesTags: ['Subscriptions']
    })
  })
})

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useLazyGetProfileByUsernameAuthQuery,
  useLazyGetProfileByIdQuery,
  useGetProfileByIdQuery,
  useSubscribeMutation,
  useLazyGetProfileByUsernameQuery,
  useLazyGetSubscriptionsQuery,
  useLazySearchUsersQuery
} = userApi
