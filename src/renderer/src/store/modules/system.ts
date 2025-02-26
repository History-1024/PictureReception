import { defineStore } from 'pinia'
import { store } from '@renderer/store'
import { appType } from './types'
import { RefreshTokenResult, refreshTokenApi } from '@renderer/api/system'
import { setToken } from '@renderer/utils/auth'
import { toggleDark } from '@renderer/hooks/theme'
export const useApp = defineStore({
  id: 'sanLing-app',
  persist: true,
  state: (): appType => ({
    routerType: '',
    themeMode: ''
  }),
  getters: {
    getRouterType(state) {
      return state.routerType
    }
  },
  actions: {
    CHANGE_SETTING({ key, value }) {
      //检查对象是否具有指定属性
      if (Reflect.has(this, key)) {
        this[key] = value
      }
    },
    changeSetting(data) {
      this.CHANGE_SETTING(data)
    },
    changeTheme() {
      toggleDark()
    },
    async handRefreshToken(data) {
      return new Promise<RefreshTokenResult>((resolve, reject) => {
        refreshTokenApi({ ...data, username: 'NanChangGongWuBu', password: '63771258' })
          .then((res) => {
            if (res) {
              //获取当前时间
              const currentDate = new Date()
              //增加 后端返回的秒数
              const resultTimestamp = currentDate.setSeconds(
                currentDate.getSeconds() + res.data.expires_in
              )
              res.data.expires = new Date(resultTimestamp)
              setToken(res.data)
              resolve(res)
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  }
})
export function useAppHook() {
  return useApp(store)
}
