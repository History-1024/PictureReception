import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from '@renderer/store'
import router from '@renderer/router'
import ElementPlus from 'element-plus'

import 'element-plus/theme-chalk/dark/css-vars.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 引入重置样式
import './style/reset.scss'
// 导入公共样式
import './style/index.scss'
import 'element-plus/dist/index.css'

import { ElMessage } from 'element-plus' //引入message组件
import 'amfe-flexible/index.js'
const app = createApp(App)

app.config.globalProperties.$message = ElMessage //挂载到app实例上
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
setupStore(app)

app.use(router)
app.use(ElementPlus, { locale: zhCn })
app.config.globalProperties.$message = ElMessage
app.mount('#app')
