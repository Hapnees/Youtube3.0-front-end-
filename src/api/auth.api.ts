import { IRegisterSend } from '../models/register/register-send.interface'
import { IRegisterGet } from '../models/register/register-get.interface'
import { ILoginGet } from '../models/login/login-get.interface'
import { ILoginSend } from '../models/login/login-send.interface'
import { userApi } from './user.api'

export const authApi = userApi.injectEndpoints({
  endpoints: build => ({
    register: build.mutation<IRegisterGet, IRegisterSend>({
      query: body => ({
        url: 'auth/register',
        method: 'POST',
        body,
      }),
    }),
    login: build.mutation<ILoginGet, ILoginSend>({
      query: body => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useRegisterMutation, useLoginMutation } = authApi
