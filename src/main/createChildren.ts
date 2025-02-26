import { BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

let childWindow
export function createChildWindow(ipcMainInstance: typeof ipcMain, parentWindow: BrowserWindow) {
  // 监听渲染进程发送的 create-childWindow 消息
  ipcMainInstance.on('create-childWindow', (_, data) => {
    try {
      if (childWindow) return
      childWindow = new BrowserWindow({
        show: false,
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true,
          webSecurity: false,
          preload: join(__dirname, '../preload/index.mjs')
        },
        parent: parentWindow, // 设置子窗口的父窗口为主窗口
        // alwaysOnTop: true,

        title: data.url
      })

      childWindow.maximize()
      childWindow.menuBarVisible = false
      //用于决定窗口是否可被用户手动最小化
      childWindow.minimizable = false
      //用于决定窗口是否可被用户手动调整大小
      childWindow.resizable = false
      // 加载指定 URL 到子窗口
      if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        childWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + '#/' + data.url)
      } else {
        childWindow.loadFile(join(__dirname, '../renderer/index.html'), { hash: data.url })
      }

      // childWindow.webContents.openDevTools()
      // 当窗口准备就绪时显示窗口
      childWindow.on('ready-to-show', () => {
        childWindow.show()
      })
      // 在子窗口关闭时触发的事件
      childWindow.on('closed', () => {
        childWindow = null
      })
      return childWindow
    } catch (error) {
      console.log('error: ', error)
    }
  })
}
