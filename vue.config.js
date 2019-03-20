module.exports = {
  publicPath: './', // 静态资源请求根目录
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    login: {
      entry: 'src/login/main.js',
      template: 'public/login.html',
      filename: 'login.html',
      chunks: ['chunk-vendors', 'chunk-common', 'login']
    }
  },
  productionSourceMap: false, // 取消源代码映射（防止源代码暴露在浏览器控制台的source中的top/webpack://目录下）
}