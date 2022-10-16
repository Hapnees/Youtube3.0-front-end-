import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const mediaApi = createApi({
	reducerPath: 'mediaApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:4000/api/media/upload',
	}),
	endpoints: build => ({
		uploadImage: build.mutation<
			{ url: string },
			{ file: FormData; userId: number; folder: string; token: string }
		>({
			query: ({ file, userId, folder = 'default', token }) => ({
				url: '/image',
				method: 'POST',
				params: {
					userId,
					folder,
				},
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: file,
			}),
		}),
	}),
})

export const { useUploadImageMutation } = mediaApi
