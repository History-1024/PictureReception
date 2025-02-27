module.exports = {
  packagerConfig: {
    ignore: [
      /^\/src/,
      /(.eslintrc.json)|(.gitignore)|(electron.vite.config.ts)|(forge.config.cjs)|(tsconfig.*)/
    ]
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'PictureReception', // 应用名称
        authors: 'History-1024', // 作者
        description: 'An Electron application for picture reception' // 应用描述
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin']
    },
    {
      name: '@electron-forge/maker-deb',
      config: {}
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {}
    }
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'History-1024',
          name: 'PictureReception'
        },
        prerelease: false, // 如果是预发布版本，设置为 true
        draft: true // 如果是草稿版本，设置为 true
      }
    }
  ]
}
