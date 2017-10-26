'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'

const postcss = require('./postcss.conf')()

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  },
  // 去除模板中的空格
  preserveWhitespace: false,
  // postcss配置,把vue文件中的样式部分,做后续处理
  postcss,
  // 不使用默认的autoprefixer
  autoprefixer: false,
}