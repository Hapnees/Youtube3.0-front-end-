import { api } from './api.api'

export const mediaApi = api.injectEndpoints({
  endpoints: build => ({
    uploadImage: build.mutation<
      { url: string },
      { file: FormData; userId: number; folder: string; token: string }
    >({
      query: ({ file, userId, folder = 'default', token }) => ({
        url: 'media/upload/image',
        method: 'POST',
        params: {
          userId,
          folder
        },
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: file
      })
    })
  })
})

export const { useUploadImageMutation } = mediaApi
