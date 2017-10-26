// 添加浏览器前缀的postcss插件
const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
/**
 * postcss
 * @return {[]} postcss handler
 */
module.exports = function postcss() {
  const posts = [
    // 添加浏览器前缀
    autoprefixer({
      browsers: '> 0.1%',
    }),
  ]
  const pxtoremOptions = {
    rootValue: 100,
    propWhiteList: [],
    replace: true,
    // minPixelValue: 3
  }
  posts.unshift(pxtorem(pxtoremOptions))

  return posts
}