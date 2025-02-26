import { http } from '@renderer/utils/http/request'

export type RefreshTokenResult = {
  code: string
  data: {
    /** `token` */
    access_token: string
    /** `token_标识` */
    token_type: string
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires_in: number
    expires: Date
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string
  }
  massage: string
}

/** 刷新token */
export const refreshTokenApi = (
  data = {
    username: 'NanChangGongWuBu',
    password: '63771258'
  }
) => {
  return http.request<RefreshTokenResult>('post', '/login', { data })
}
