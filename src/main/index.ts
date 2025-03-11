import { app, shell, BrowserWindow, ipcMain, Tray, Menu, nativeImage, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import logo from '../../resources/logo.png?asset'
import { autoUpdater } from 'electron-updater'
// 导入 createChildWindow 函数
// import { createChildWindow } from './createChildren'
// import { getAppToken } from './util/auth'
import { sendAxiosGetData } from './util/getData'
import store from './store'

//托盘对象
let appTray: Tray | null // 创建窗口函数
let mainWindow: BrowserWindow
function createWindow(): void {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    fullscreen: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { logo } : {}),
    icon: logo,
    webPreferences: {
      // webSecurity: false,
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false
    }
  })

  // 当窗口准备就绪时显示窗口
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // 设置窗口打开处理程序，用于在默认浏览器中打开外部链接
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
  // mainWindow.webContents.openDevTools()
  // HMR（热模块替换）用于 Electron-Vite CLI 的渲染器。
  // 根据开发环境加载远程 URL 或生产环境中的本地 HTML 文件。

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
  if (process.platform === 'win32') {
    //设置托盘图标和菜单
    const trayMenuTemplate = Menu.buildFromTemplate([
      {
        label: '打开',
        click: () => {
          mainWindow.show()
        }
      },
      // {
      //   label: '切换主题',
      //   click: () => {
      //     mainWindow.webContents.send('update-toggleTheme')
      //   }
      // },
      {
        label: '退出',
        click: () => {
          app.quit()
          app.quit() //因为程序设定关闭为最小化，所以调用两次关闭，防止最大化时一次不能关闭的情况
        }
      }
    ])
    //系统托盘图标
    appTray = new Tray(nativeImage.createFromPath(logo))
    //图标的上下文菜单
    const contextMenu = trayMenuTemplate
    //设置此托盘图标的悬停提示内容
    appTray.setToolTip('电务设备登乘检查图像接收处理系统')
    //设置此图标的上下文菜单
    appTray.setContextMenu(contextMenu)
    //单击右下角小图标显示应用左键
    appTray.on('click', function () {
      mainWindow.show()
    })
    //右键
    appTray.on('right-click', () => {
      appTray?.popUpContextMenu(trayMenuTemplate)
    })
  }
  // 在 createWindow 中调用 createChildWindow
  // createChildWindow(ipcMain, mainWindow)
}

// 当 Electron 完成初始化并准备创建浏览器窗口时，将调用此方法。
// 在此事件发生后才能使用某些 API。
app.whenReady().then(() => {
  //打开应用获取token
  // getAppToken({
  //   username: 'NanChangGongWuBu',
  //   password: '63771258'
  // })
  // //监听获取token
  // ipcMain.handle('auth:getAppToken', async (_event, data) => {
  //   const res = await getAppToken(data)
  //   return res
  // })
  // //监听获取缓存token
  // ipcMain.handle('auth:getStoreToken', (_event, data) => {
  //   const res = getAppToken(data)
  //   return res
  // })
  // //监听请求
  ipcMain.handle('getData:sendAxiosGetData', async (_event, data) => {
    return await sendAxiosGetData(data)
  })
  // 监听渲染进程的更新请求
  ipcMain.handle('restart-app', () => {
    autoUpdater.quitAndInstall() // 重启应用并安装更新
  })
  // 为 Windows 设置应用程序用户模型 ID
  electronApp.setAppUserModelId('com.electron')

  // 默认通过 F12 打开或关闭开发工具（仅在开发环境中），
  // 并在生产环境中忽略 CommandOrControl + R。
  // 详情请参见 https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  // 创建窗口
  createWindow()

  // 在 macOS 上，当单击 dock 图标并且没有其他窗口打开时，
  // 重新创建一个窗口是常见的。
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  try {
    // const updateUrl = 'https://github.com/History-1024/PictureReception/releases/' // 替换为你的服务器地址
    autoUpdater.setFeedURL({
      provider: 'github', // 指定 GitHub 提供者
      owner: 'History-1024',
      repo: 'PictureReception',
      token: process.env.GITHUB_TOKEN
    })
    // autoUpdater.autoDownload = true
    autoUpdater.checkForUpdates()
    autoUpdater.on('update-available', () => {
      //有更新直接下载
      autoUpdater.downloadUpdate()
      //         // 手动触发下载
      // try {
      //   dialog
      //     .showMessageBox(mainWindow, {
      //       type: 'info',
      //       title: '新版本可用',
      //       message: `发现新版本${info.version}，要下载吗？`,
      //       buttons: ['是', '否']
      //     })
      //     .then((result) => {
      //       if (result.response === 0) {
      //         autoUpdater.downloadUpdate()
      //       }
      //     })
      // } catch (error) {
      //   dialog.showMessageBox(mainWindow, {
      //     type: 'info',
      //     title: 'error',
      //     message: `${error}`
      //   })
      // }
    })
    autoUpdater.on('download-progress', (progressObj) => {
      mainWindow.webContents.send('update-progress', progressObj)
    })

    // 自动退出并安装
    autoUpdater.on('update-downloaded', (info) => {
      dialog
        .showMessageBox(mainWindow, {
          type: 'info',
          title: '更新已下载',
          message: `新版本 ${info.version} 已下载，是否立即安装？`,
          buttons: ['是', '否']
        })
        .then((result) => {
          if (result.response === 0) {
            autoUpdater.quitAndInstall()
          }
        })
    })
    autoUpdater.on('error', (error) => {
      dialog.showMessageBox(mainWindow, {
        type: 'info',
        title: 'error',
        message: `${error}`
      })
      console.error('Update error:', error)
    })
  } catch (error) {
    dialog.showMessageBox(mainWindow, {
      type: 'info',
      title: 'error',
      message: `${error}`
    })
  }
})

// 当所有窗口关闭时退出应用程序，但在 macOS 上例外。
// 在 macOS 上，通常应用程序和其菜单栏保持活动状态，直到用户使用 Cmd + Q 显式退出。
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    //清楚缓存token
    store.clear()
    app.quit()
  }
})

// 在此文件中，您可以包含应用程序特定的主进程代码。
// 您还可以将它们放在单独的文件中，并在此处引入它们。
