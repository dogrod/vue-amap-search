<template lang="html">
  <div class="location-selector" v-show="visible">
    <search :placesearch="placesearch" :city="city" @gotResult="handleGotResult"></search>
    <div class="map-container">
      <el-amap :vid="'amap-vue'"
               :center="center"
               :zoom="zoom"
               :map-manager="amapManager"
               :plugin="plugin"
               :events="events">
        <el-amap-marker :position="centerMarker" v-if="centerMarker.length"></el-amap-marker>
        <el-amap-marker v-for="marker in markers" :position="marker"></el-amap-marker>
      </el-amap>
    </div>
    <result-list :searchResult="searchResult"
                 :geocoder="geocoder"
                 :clientHeight="client.height"
                 :clientWidth="client.width"
                 @selected="handleSelected"
                 ></result-list>
  </div>
</template>

<script>
  import { AMapManager } from 'vue-amap'
  import search from './search.vue'
  import resultList from './resultList.vue'

  let amapManager = new AMapManager()
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    components: {
      search,
      resultList
    },
    data() {
      let self = this
      return {
        vid: 'amap-vue-1',
        zoom: 15,
        center: [120.21440818650825, 30.253264929440956],
        markers: [
        ],
        centerMarker: [],
        amapManager: amapManager,
        events: {
          moveend: () => {
            let mapCenter = this.amapManager.getMap().getCenter()
            this.center = [mapCenter.getLng(), mapCenter.getLat()]
            this.centerMarker = [mapCenter.getLng(), mapCenter.getLat()]
            this.searchPoint(this.centerMarker)
          },
          zoomchange: () => {
            this.zoom = this.amapManager.getMap().getZoom()
          },
          click: (e) => {
            this.centerMarker = [e.lnglat.lng, e.lnglat.lat]
            this.center = [e.lnglat.lng, e.lnglat.lat]
          }
        },
        plugin: ['ToolBar', {
          pName: 'PlaceSearch',  // poi搜索插件
          events: {
            init(instance) {
              self.placesearch = instance
            }
          }
        }, {
          pName: 'Geolocation', // 定位插件
          events: {
            init(instance) {
              instance.getCurrentPosition((status, result) => {
                self.city = result.addressComponent.city
                self.center = [result.position.lng, result.position.lat]
                self.searchPoint([result.position.lng, result.position.lat])
              })
            }
          }
        }, {
          pName: 'Geocoder', // 行政区域搜索插件
          events: {
            init(instance) {
              self.geocoder = instance
            }
          }
        }],
        searchResult: [],
        placesearch: {}, // 插件实例
        districtsearch: {}, // 插件实例
        geocoder: {}, // 插件实例
        city: '',
        client: {
          height: 0,
          width: 0
        },
        visible: this.value
      }
    },
    methods: {
      /**
       * 搜索组件获得搜索数据事件
       * @param {Object} result 高德地图返回的搜索结果
       */
      handleGotResult(result) {
        this.updatesearchResult(result.poiList.pois)
      },
      handleSelected(address) {
        this.$emit('input', false)
        this.$emit('selected', address)
      },
      /**
       * 搜索某一点附近1000米内的poi
       * @param {Array} point 需要搜索的位置，数据结构为 [lng,lat]
       */
      searchPoint(point) {
        this.placesearch.searchNearBy('', point, 1000, (status, result) => {
          if (result.poiList) {
            this.updatesearchResult(result.poiList.pois)
          }
        })
      },
      /**
       * 更新搜索结果列表方法
       * @param {Array} point 经过筛选的搜索结果
       */
      updatesearchResult(result) {
        this.searchResult = []
        if (result && result.length) {
          this.searchResult = result
        }
      },
    },
    watch: {
      value(value) {
        this.visible = value
      }
    },
    mounted() {
      this.client.height = window.innerHeight
      this.client.width = window.innerWidth
    }
  }
</script>

<style lang="stylus" scoped>
  .location-selector {
    position: fixed;
    top: 0;
    left: 0;

    width: 100vw;
  }
  .map-container {
    height: 400px;

  }
</style>
