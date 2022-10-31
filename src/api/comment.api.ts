import { ICommentGet } from '../models/comment/comment-get.interface'
import { ICommentSend } from '../models/comment/comment-send.interface'
import { api } from './api.api'

const apiWithTags = api.enhanceEndpoints({ addTagTypes: ['Comment'] })

export const commentApi = apiWithTags.injectEndpoints({
  endpoints: build => ({
    getComments: build.query<
      { comments: ICommentGet[]; total_count: number },
      { videoId: number; page?: number }
    >({
      query: data => ({
        url: 'comment/get',
        params: data
      }),
      providesTags: ['Comment']
    }),

    addComment: build.mutation<
      { commentId: number },
      { comment: ICommentSend; token: string }
    >({
      query: ({ comment, token }) => ({
        url: 'comment/add',
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: comment
      }),
      invalidatesTags: result => [
        { type: 'Comment', commentId: result?.commentId }
      ]
    }),

    addLikeComment: build.mutation<
      { message: string; commentId: number },
      { body: { userId: number; commentId: number }; token: string }
    >({
      query: ({ body, token }) => ({
        url: 'comment/like',
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
        body
      }),
      invalidatesTags: result => [
        { type: 'Comment', commentId: result?.commentId }
      ]
    }),

    addDislikeComment: build.mutation<
      { message: string; commentId: number },
      { body: { userId: number; commentId: number }; token: string }
    >({
      query: ({ body, token }) => ({
        url: 'comment/dislike',
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
        body
      }),
      invalidatesTags: result => [
        { type: 'Comment', commentId: result?.commentId }
      ]
    })
  })
})

export const {
  useLazyGetCommentsQuery,
  useGetCommentsQuery,
  useAddCommentMutation,
  useAddLikeCommentMutation,
  useAddDislikeCommentMutation
} = commentApi
