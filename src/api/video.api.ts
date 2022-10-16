import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { IVideoAdd } from '../models/video/video-add.interface'

export const videoApi = createApi({
	reducerPath: 'videoApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api/video' }),
	endpoints: build => ({
		addVideo: build.mutation<any, { file: IVideoAdd; token: string }>({
			query: ({ file, token }) => ({
				url: 'add',
				method: 'POST',
				headers: { Authorization: `Bearer ${token}` },
				body: file,
			}),
		}),
	}),
})

export const { useAddVideoMutation } = videoApi
