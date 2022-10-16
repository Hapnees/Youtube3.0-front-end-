import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { IVideoAdd } from '../models/video/video-add.interface'
import { IVideoGetHomePage } from '../models/video/video-get-hpage.interface'
import { IVideoGetPage } from '../models/video/video-get-page.interfacep'

export const videoApi = createApi({
	reducerPath: 'videoApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api/video' }),
	endpoints: build => ({
		addVideo: build.mutation<
			{ message: string },
			{ file: IVideoAdd; token: string }
		>({
			query: ({ file, token }) => ({
				url: 'add',
				method: 'POST',
				headers: { Authorization: `Bearer ${token}` },
				body: file,
			}),
		}),
		getVideos: build.query<IVideoGetHomePage[], void>({
			query: () => '/',
		}),
		getVideoById: build.query<IVideoGetPage, number>({
			query: id => ({
				url: '/byId',
				params: { id },
			}),
		}),
	}),
})

export const { useAddVideoMutation, useGetVideosQuery, useGetVideoByIdQuery } =
	videoApi
