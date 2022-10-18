import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICommentGet } from '../models/comment/comment-get.interface'
import { ICommentSend } from '../models/comment/comment-send.interface'
import { IUserGet } from '../models/user/user-get.interface'
import { IUserUpdate } from '../models/user/user-update.interface'
import { IVideoAdd } from '../models/video/video-add.interface'
import { IVideoGetHomePage } from '../models/video/video-get-hpage.interface'
import { IVideoGetPage } from '../models/video/video-get-page.interface'
import { IVideoUpdate } from '../models/video/video-uptadte.interface'

export const userApi = createApi({
	reducerPath: 'userApi',
	tagTypes: ['User', 'Video', 'Comment'],
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

		getProfileByUsername: build.query<IUserGet, string>({
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
			invalidatesTags: result => [{ type: 'User', username: result?.username }],
		}),

		getVideoById: build.query<IVideoGetPage, number>({
			query: id => ({
				url: 'video/byId',
				params: { id },
			}),
			providesTags: ['Video'],
		}),

		getVideos: build.query<IVideoGetHomePage[], void>({
			query: () => 'video',
		}),

		searchVideos: build.query<IVideoGetHomePage[], string>({
			query: search => ({
				url: 'video/search',
				params: { search },
			}),
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
	useGetVideosQuery,
	useUpdateVideoMutation,
	useDeleteVideoMutation,
	useLazySearchVideosQuery,
	useSearchVideosQuery,
	useAddCommentMutation,
	useGetCommentsQuery,
} = userApi
