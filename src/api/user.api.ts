import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICommentGet } from '../models/comment/comment-get.interface'
import { ICommentSend } from '../models/comment/comment-send.interface'
import { IUserGetByUsername } from '../models/user/user-get-byusername.interface'
import { IUserGet } from '../models/user/user-get.interface'
import { IUserUpdate } from '../models/user/user-update.interface'
import { IVideoAdd } from '../models/video/video-add.interface'
import { IVideoGetVideoCard } from '../models/video/video-get-VideoCardinterface'
import { IVideoGetVideoPage } from '../models/video/video-get-page.interface'
import { IVideoUpdate } from '../models/video/video-uptadte.interface'
import { IVideoGetVideoCardPlus } from '../models/video/vide-get-VideoCardPlus'

export const userApi = createApi({
	reducerPath: 'userApi',
	tagTypes: ['User', 'Video', 'Comment', 'ProfileVideos', 'Subscriptions'],
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:4000/api/',
	}),
	endpoints: build => ({
		searchUsers: build.query<
			{
				username: string
				avatar_path: string
				subscribers_count: number
				description: string
			}[],
			string
		>({
			query: username => ({
				url: 'user/search',
				params: { username },
			}),
		}),

		getSubscriptions: build.query<
			{ username: string; avatar_path: string }[],
			{ token: string; limit?: number }
		>({
			query: ({ token, limit }) => ({
				url: 'user/subscriptions',
				headers: { Authorization: `Bearer ${token}` },
				params: { limit },
			}),
			providesTags: ['Subscriptions'],
		}),

		getProfile: build.query<IUserGet, string>({
			query: token => ({
				url: 'user/profile',
				headers: { Authorization: `Bearer ${token}` },
			}),
			providesTags: ['User'],
		}),

		getProfileByUsernameAuth: build.query<
			IUserGetByUsername,
			{ username: string; token: string }
		>({
			query: ({ username, token }) => ({
				url: `user/auth/${username}`,
				headers: { Authorization: `Bearer ${token}` },
			}),
			providesTags: ['User'],
		}),

		getProfileByUsername: build.query<
			Omit<IUserGetByUsername, 'is_subscribed'>,
			string
		>({
			query: username => ({
				url: `user/${username}`,
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
				url: 'user/profile/update',
				method: 'PUT',
				headers: { Authorization: `Bearer ${token}` },
				body: userData,
			}),
			invalidatesTags: result => [{ type: 'User', username: result?.username }],
		}),

		getProfileVideosByUsername: build.query<IVideoGetVideoCardPlus[], string>({
			query: username => ({
				url: `video/profile/${username}`,
			}),
			providesTags: ['ProfileVideos'],
		}),

		getProfileVideos: build.query<IVideoGetVideoCardPlus[], string>({
			query: token => ({
				url: 'video/profile',
				headers: { Authorization: `Bearer ${token}` },
			}),
			providesTags: ['ProfileVideos'],
		}),

		addVideo: build.mutation<
			{ message: string; username: string },
			{ file: IVideoAdd; token: string }
		>({
			query: ({ file, token }) => ({
				url: 'video/add',
				method: 'POST',
				headers: { Authorization: `Bearer ${token}` },
				body: file,
			}),
			invalidatesTags: ['ProfileVideos'],
		}),

		updateVideo: build.mutation<
			{ message: string; username: string },
			{ file: IVideoUpdate; token: string }
		>({
			query: ({ file, token }) => ({
				url: 'video/update',
				method: 'PUT',
				headers: { Authorization: `Bearer ${token}` },
				body: file,
			}),
			invalidatesTags: ['ProfileVideos'],
		}),

		deleteVideo: build.mutation<
			{ message: string; username: string },
			{ id: number; token: string }
		>({
			query: ({ id, token }) => ({
				url: 'video/delete',
				method: 'DELETE',
				headers: { Authorization: `Bearer ${token}` },
				body: { id },
			}),
			invalidatesTags: ['ProfileVideos'],
		}),

		getVideoById: build.query<
			IVideoGetVideoPage,
			{ id: number; idFrom?: number }
		>({
			query: ({ id, idFrom }) => ({
				url: 'video/byId',
				params: { id, idFrom },
			}),
			providesTags: ['Video'],
		}),

		getVideos: build.query<
			{ videos: IVideoGetVideoCard[]; total_pages: number },
			{ limit?: number; page?: number; search?: string; category?: string }
		>({
			query: ({ limit = 12, page = 1, search, category }) => ({
				url: 'video',
				params: { limit, page, search, category },
			}),
		}),

		getLikeVideos: build.query<
			{ videos: IVideoGetVideoCard[]; total_pages: number },
			{ token: string; limit?: number; page?: number }
		>({
			query: ({ token, limit, page }) => ({
				url: 'video/liked',
				headers: { Authorization: `Bearer ${token}` },
				params: { limit, page },
			}),
		}),

		addLikeVideo: build.mutation<
			{ message: string; videoId: number },
			{ id: number; token: string }
		>({
			query: ({ id, token }) => ({
				url: 'video/like/add',
				method: 'PATCH',
				headers: { Authorization: `Bearer ${token}` },
				body: { id },
			}),

			invalidatesTags: ['Video'],
		}),

		addDislikeVideo: build.mutation<
			{ message: string; videoId: number },
			{ id: number; token: string }
		>({
			query: ({ id, token }) => ({
				url: 'video/dislike/add',
				method: 'PATCH',
				headers: { Authorization: `Bearer ${token}` },
				body: { id },
			}),

			invalidatesTags: ['Video'],
		}),

		updateViews: build.mutation<{ message: string }, number>({
			query: videoId => ({
				url: 'video/views',
				method: 'PATCH',
				body: { videoId },
			}),
			invalidatesTags: ['Video'],
		}),

		addComment: build.mutation<
			{ commentId: number },
			{ comment: ICommentSend; token: string }
		>({
			query: ({ comment, token }) => ({
				url: 'comment/add',
				method: 'POST',
				headers: { Authorization: `Bearer ${token}` },
				body: comment,
			}),
			invalidatesTags: result => [
				{ type: 'Comment', username: result?.commentId },
			],
		}),

		getComments: build.query<ICommentGet[], number>({
			query: videoId => ({
				url: 'comment/get',
				params: { videoId },
			}),
			providesTags: ['Comment'],
		}),

		addLikeComment: build.mutation<
			{ message: string; commentId: number },
			{ body: { userId: number; commentId: number }; token: string }
		>({
			query: ({ body, token }) => ({
				url: 'comment/like',
				method: 'PATCH',
				headers: { Authorization: `Bearer ${token}` },
				body,
			}),
			invalidatesTags: ['Comment'],
		}),

		addDislikeComment: build.mutation<
			{ message: string; commentId: number },
			{ body: { userId: number; commentId: number }; token: string }
		>({
			query: ({ body, token }) => ({
				url: 'comment/dislike',
				method: 'PATCH',
				headers: { Authorization: `Bearer ${token}` },
				body,
			}),
			invalidatesTags: ['Comment'],
		}),

		subscribe: build.mutation<
			{ message: string },
			{ userId: number; token: string }
		>({
			query: ({ userId, token }) => ({
				url: 'user/subscribe',
				method: 'PATCH',
				headers: { Authorization: `Bearer ${token}` },
				body: { userId },
			}),
			invalidatesTags: ['Video', 'User', 'Subscriptions'],
		}),
	}),
})

export const {
	useGetProfileQuery,
	useUpdateProfileMutation,
	useLazyGetProfileByUsernameAuthQuery,
	useLazyGetProfileByIdQuery,
	useGetProfileByIdQuery,
	useAddVideoMutation,
	useGetVideoByIdQuery,
	useLazyGetVideosQuery,
	useUpdateVideoMutation,
	useDeleteVideoMutation,
	useAddCommentMutation,
	useGetCommentsQuery,
	useAddLikeVideoMutation,
	useAddDislikeVideoMutation,
	useAddLikeCommentMutation,
	useAddDislikeCommentMutation,
	useSubscribeMutation,
	useGetProfileVideosQuery,
	useLazyGetProfileByUsernameQuery,
	useGetProfileVideosByUsernameQuery,
	useUpdateViewsMutation,
	useLazyGetSubscriptionsQuery,
	useLazySearchUsersQuery,
	useLazyGetLikeVideosQuery,
} = userApi
