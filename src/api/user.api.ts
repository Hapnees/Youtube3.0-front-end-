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
	tagTypes: ['User', 'Video', 'Comment', 'ProfileVideos'],
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:4000/api/',
	}),
	endpoints: build => ({
		getProfile: build.query<IUserGet, string>({
			query: token => ({
				url: 'user/profile',
				headers: { Authorization: `Bearer ${token}` },
			}),
			providesTags: ['User'],
		}),

		getProfileByUsername: build.query<IUserGetByUsername, string>({
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
			invalidatesTags: result => [{ type: 'User', username: result?.username }],
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
			invalidatesTags: result => [{ type: 'User', username: result?.username }],
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

		getVideos: build.query<IVideoGetVideoCard[], void>({
			query: () => 'video',
		}),

		searchVideos: build.query<IVideoGetVideoCard[], string>({
			query: search => ({
				url: 'video/search',
				params: { search },
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
			invalidatesTags: ['Video'],
		}),
	}),
})

export const {
	useGetProfileQuery,
	useUpdateProfileMutation,
	useGetProfileByUsernameQuery,
	useLazyGetProfileByIdQuery,
	useGetProfileByIdQuery,
	useAddVideoMutation,
	useGetVideoByIdQuery,
	useLazyGetVideosQuery,
	useUpdateVideoMutation,
	useDeleteVideoMutation,
	useLazySearchVideosQuery,
	useSearchVideosQuery,
	useAddCommentMutation,
	useGetCommentsQuery,
	useAddLikeVideoMutation,
	useAddDislikeVideoMutation,
	useAddLikeCommentMutation,
	useAddDislikeCommentMutation,
	useSubscribeMutation,
	useGetProfileVideosQuery,
} = userApi
