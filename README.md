# ELECTRON-VUE 实例

## 项目向导

### 相关依赖版本

`NODE:V18.0.0 `
`NPM:V8.6.0  `
`PNPM:8.14.3`

### 项目目录结构

```src
├──main  --主线程
│  ├──...
│  └──vite.config.js
├──preload  --预渲染线程
│  ├──...
│  └──vite.config.js
└──renderer  --渲染线程
│  ├──src
│  │  ├──api  --后端接口地址
│  │  ├──assets  --静态资源文件夹
│  │  ├──components  --全局组件
│  │  ├──constant  --常量文件夹
│  │  ├──hooks  --封装的Hook
│  │  ├──layout  --基础布局组件
│  │  ├──router  --路由
│  │  ├──store   --状态管理
│  │  ├──style   --全局样式文件
│  │  ├──utils  --工具函数
│  │  ├──view  --视图文件夹
│  ├──types
│  ├──index.html
│  └──vite.config.js
```

## 推荐的IDE设置

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)

### 初始化依赖

```bash
$ pnpm install
```

### 开发环境启动命令

```bash
$ pnpm dev
```

### 构建生成命令

```bash
# For windows
$ pnpm build:win

# For macOS
$ pnpm build:mac

# For Linux
$ pnpm build:linux
```
