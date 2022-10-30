import { IVideoCardByUsername } from '../models/video/vide-get-VideoCardByUsername'
import { IVideoAdd } from '../models/video/video-add.interface'
import { IVideoGetVideoPage } from '../models/video/video-get-page.interface'
import { IVideoCard } from '../models/video/video-get-VideoCard.interface'
import { IVideoUpdate } from '../models/video/video-uptadte.interface'
import { userApi } from './user.api'

const apiWithTags = userApi.enhanceEndpoints({ addTagTypes: ['ProfileVideos'] })

export const videoApi = apiWithTags.injectEndpoints({
  endpoints: build => ({
    getVideos: build.query<
      { videos: IVideoCard[]; total_count: number },
      { limit?: number; page?: number; search?: string; category?: string }
    >({
      query: ({ limit = 12, page = 1, search, category }) => ({
        url: 'video',
        params: { limit, page, search, category }
      })
    }),

    getLikeVideos: build.query<
      { videos: IVideoCard[]; total_pages: number },
      { token: string; limit?: number; page?: number }
    >({
      query: ({ token, limit, page }) => ({
        url: 'video/liked',
        headers: { Authorization: `Bearer ${token}` },
        params: { limit, page }
      })
    }),

    getVideoById: build.query<
      IVideoGetVideoPage,
      { id: number; idFrom?: number }
    >({
      query: ({ id, idFrom }) => ({
        url: 'video/byId',
        params: { id, idFrom }
      }),
      providesTags: ['VideoPage']
    }),

    getProfileVideos: build.query<IVideoCardByUsername[], string>({
      query: token => ({
        url: 'video/profile',
        headers: { Authorization: `Bearer ${token}` }
      }),
      providesTags: result =>
        result
          ? [
            ...result.map(({ id }) => ({
              type: 'ProfileVideos' as const,
              id
            })),
            'ProfileVideos'
          ]
          : ['ProfileVideos']
    }),

    getProfileVideosByUsername: build.query<IVideoCardByUsername[], string>({
      query: username => ({
        url: `video/profile/${username}`
      })
    }),

    updateViews: build.mutation<{ message: string }, number>({
      query: videoId => ({
        url: 'video/views',
        method: 'PATCH',
        body: { videoId }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'VideoPage', videoId: arg }
      ]
    }),

    addLikeVideo: build.mutation<
      { message: string; videoId: number },
      { id: number; token: string }
    >({
      query: ({ id, token }) => ({
        url: 'video/like/add',
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
        body: { id }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'VideoPage', videoId: arg.id }
      ]
    }),

    addDislikeVideo: build.mutation<
      { message: string; videoId: number },
      { id: number; token: string }
    >({
      query: ({ id, token }) => ({
        url: 'video/dislike/add',
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
        body: { id }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'VideoPage', videoId: arg.id }
      ]
    }),

    addVideo: build.mutation<
      { message: string; videoId: number },
      { file: IVideoAdd; token: string }
    >({
      query: ({ file, token }) => ({
        url: 'video/add',
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: file
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'ProfileVideos', vid: arg.file.vid }
      ]
    }),

    updateVideo: build.mutation<
      { message: string; username: string },
      { file: IVideoUpdate; token: string }
    >({
      query: ({ file, token }) => ({
        url: 'video/update',
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: file
      })
    }),

    deleteVideo: build.mutation<
      { message: string; username: string },
      { id: number; token: string }
    >({
      query: ({ id, token }) => ({
        url: 'video/delete',
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
        body: { id }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'ProfileVideos', id: arg.id }
      ]
    })
  })
})

export const {
  useLazyGetVideosQuery,
  useLazyGetLikeVideosQuery,
  useGetVideoByIdQuery,
  useGetProfileVideosQuery,
  useLazyGetProfileVideosByUsernameQuery,
  useUpdateViewsMutation,
  useAddLikeVideoMutation,
  useAddDislikeVideoMutation,
  useAddVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation
} = videoApi
