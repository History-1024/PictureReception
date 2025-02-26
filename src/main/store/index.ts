import ElectronStore from 'electron-store'

const store = new ElectronStore()
type Token = {
  access_token: string
  expires: number
  token_type: string
}
//再缓存中获取token
export const getStoreToken = (): Token | null => {
  const token = store.get('token') as Token
  if (token) {
    const flag = new Date().getTime() > token.expires
    if (flag) {
      store.delete('token')
      return null
    } else {
      return token
    }
  } else {
    return null
  }
}
export default store
