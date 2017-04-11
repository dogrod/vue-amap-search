// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import AMap from 'vue-amap'

import App from './app'
import router from './router'
import store from './store'

Vue.use(AMap)
AMap.initAMapApiLoader({
  key: '787c512840646158bc9317d1f3f62c8d',
  plugin: ['ToolBar', 'Geolocation', 'PlaceSearch']
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
