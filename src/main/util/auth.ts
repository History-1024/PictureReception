import store, { getStoreToken } from '../store'
import { http } from './http/request'

export type RefreshTokenResult = {
  data: {
    /** `token` */
    access_token: string
    /** `token_标识` */
    token_type: string
    expires: number
  }
}
/** 刷新token */
const refreshTokenApi = (
  data = {
    username: 'NanChangGongWuBu',
    password: '63771258'
  }
) => {
  return http.request<RefreshTokenResult>('post', '/login', { data })
}

type Token = {
  access_token: string
  expires: number
  token_type: string
}
//获取token
const getAppToken = (
  data = {
    password: '63771258',
    username: 'NanChangGongWuBu'
  }
) => {
  return new Promise<Token>((resolve, reject) => {
    const token = getStoreToken()
    if (token) {
      //缓存
      console.log('缓存: ')
      resolve(token)
    } else {
      //请求
      console.log('请求: ')
      refreshTokenApi(data)
        .then((res) => {
          const { data } = res
          //保存缓存中
          setStoreToken(data)
          resolve(data)
        })
        .catch((error) => {
          console.log('error: ', error)
          reject(error)
        })
    }
  })
}
const setStoreToken = (data) => {
  data.expires = new Date().getTime() + 2 * 1000
  store.set('token', data)
}
/** 格式化token（jwt格式） */
export const formatToken = (token_type: string = 'bearer', token: string): string => {
  return token_type + ' ' + token
}
export { getAppToken }
