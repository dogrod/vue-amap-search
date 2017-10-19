// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueAMap from 'vue-amap'

import './assets/styles/base.styl'

Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '787c512840646158bc9317d1f3f62c8d',
  plugin: ['ToolBar', 'Geolocation', 'PlaceSearch', 'Geocoder', 'Autocomplete']
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
