# Vue Amap Search
> 使用Vue-amap组件库完成的高德地图选址插件

**目前仅适配iPhone6**

## TODO

-  [ ] 拖拽时不间断移动centerMarker的位置（目前仅能做到在moveend时移动）
-  [ ] 搜索联想/补全功能
-  [ ] 界面优化及设备适配
-  [ ] 返回返回数据的自由组合
-  [ ] etc.

## 已知问题

-  [x] 当distance为NaN时视口宽度会发生变化
-  [ ] 搜索会偶发性触发搜索面板消失，并且无法恢复

> 如有问题请发 issue 或发邮件至 <rodrickjue@hotmail.com>
> If you have any question, please [Contact me](rodrickjue@hotmail.com)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
