module.exports = {
  outputDir: 'dist',
  //  如果是部署在nginx上需要将publicPath 配置与nginx一致
  publicPath:
    process.env.VUE_APP_BASE_router_model === 'hash' ? '' : process.env.VUE_APP_BASE_front_url,
  // // build时放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  // assetsDir: '',
  // // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  // indexPath: 'index.html',
  // // 默认在生成的静态资源文件名中包含hash以控制缓存
  // // filenameHashing: true,
  // // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码 (在生产构建时禁用 eslint-loader)
  lintOnSave: false,
  // // 是否使用包含运行时编译器的 Vue 构建版本
  // runtimeCompiler: false,
  // 所有 webpack-dev-server 的选项都支持
  devServer: {
    //接口mocksh
    // before(app) {
    //   app.post('/login', (req, res) => {})
    // },
    port: 9999, //端口
    // host: 'localhost', //域名
    open: true, //配置浏览器自动启动
    proxy: {
      '/base_api': {
        target: 'http://192.168.20.252:8250',
        changeOrigin: true,
        pathRewrite: {
          '^/base_api': ''
        }
      }
    }
  }
}
