import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface WindowMessage {
    url: string
    data?: object
  }
  type Token = {
    access_token: string
    expires: number
    token_type: string
  }
  interface GetStoreToken {
    getStoreToken: () => Token | null
  }
  interface CustomerAPI {
    createChildWindow(data: WindowMessage): void
    toggleTheme: (callback) => Electron.IpcRenderer
    getAppToken: (data: { password: string; username: string }) => Promise<Token>
    getStoreToken: () => Promise<Token | null>
    sendAxios<T>(data: { url: string; method: string; data?: object }): Promise<T>
  }
  interface Window {
    electron: ElectronAPI
    ElectronApi: CustomerAPI
  }
}
