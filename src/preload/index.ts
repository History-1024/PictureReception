//contextBridge是一个用于在主进程和渲染进程之间创建安全通信桥梁的工具
import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { RequestMethods } from '../main/util/http/types'

declare global {
  interface Window {
    electron: typeof electronAPI
    ElectronApi: CustomerAPI
  }
}
// Custom APIs for renderer
interface CustomerAPI {
  createChildWindow(data: WindowMessage): void
  toggleTheme(callback: () => void): void // 改为 void，避免返回 IpcRenderer
  getAppToken(data: { password: string; username: string }): Promise<Token>
  sendAxios<T>(url: string, method: RequestMethods, data?: object): Promise<T>
  // getStoreToken?(): Promise<Token | null>; // 如果需要，取消注释
}
interface WindowMessage {
  url: string
  data?: object
}

type Token = {
  access_token: string
  expires: number
  token_type: string
}

const customApi: CustomerAPI = {
  //创建子窗口
  createChildWindow: (data) => {
    ipcRenderer.send('create-childWindow', data)
  },
  //托盘切换主题
  toggleTheme: (callback) => ipcRenderer.on('update-toggleTheme', () => callback()),
  //渲染进程调用主进程的方法，返回一个异步的Promise
  getAppToken: (data) => ipcRenderer.invoke('auth:getAppToken', data),
  // getStoreToken: () => ipcRenderer.invoke('auth:getStoreToken')

  //封装一个通用请求函数，将结果返回给渲染进程
  sendAxios: (data) => {
    return ipcRenderer.invoke('getData:sendAxiosGetData', data)
  }
}

/*
  使用' contextBridge ' api
  只在启用上下文隔离时向渲染器暴露Electron和 ElectronApi
  否则只添加到DOM全局变量中
*/

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('ElectronApi', customApi)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.ElectronApi = customApi
}
