import { ICommentGet } from "../models/comment/comment-get.interface";
import { ICommentSend } from "../models/comment/comment-send.interface";
import { userApi } from "./user.api";

export const commentApi = userApi.injectEndpoints({
  endpoints: build => ({
    getComments: build.query<ICommentGet[], number>({
      query: videoId => ({
        url: 'comment/get',
        params: { videoId }
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
    }),


  })
})

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useAddLikeCommentMutation,
  useAddDislikeCommentMutation
} = commentApi
