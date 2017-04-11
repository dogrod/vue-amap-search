import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/hello/hello'
import MapSelector from '@/views/map-select/map-select'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }, {
      path: '/map-selector',
      name: 'MapSelector',
      component: MapSelector
    }
  ]
})
