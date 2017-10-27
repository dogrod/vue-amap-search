<template>
<div class="location-picker">
  <div class="location-picker__search">
    <search-location
      :placeholder="placeholder"
      :city-limited="currentCity"
      :plugin="plugins.autocomplete"
      @on-search="handleSearch"
    ></search-location>
  </div>
  <div class="amap-ui-compoent-wrapper">
    <el-amap
      vid="dgAmap"
      :plugin="plugin"
      :amap-manager="aMapManager"
      :zoom="uiComponentModel.zoom"
      :center="uiComponentModel.center"
      :events="uiComponentModel.events"
    >
      <el-amap-marker
        :position="uiComponentModel.center"
      ></el-amap-marker>
    </el-amap>
  </div>
  <div class="location-picker__results">
    <result-list
      :data="result.pois"
    ></result-list>
  </div>
</div>
</template>

<script>
import _ from 'lodash'
import { AMapManager } from 'vue-amap'

import resultList from './result-list.vue'
import searchLocation from './search-location.vue'

const defaultCenter = [120.21440818650825, 30.253264929440956]
const aMapManager = new AMapManager()

export default {
  name: 'LocationPicker',
  components: {
    resultList,
    searchLocation,
  },
  props: {
    placeholder: {
      type: String,
      default: 'Please input location info',
    },
  },
  data() {
    return {
      aMapManager,
      uiComponentModel: {
        center: defaultCenter.slice(),
        zoom: 15,
        centerMarker: defaultCenter.slice(),
        events: {
          mapmove: () => {
            const mapCenter = this.aMapManager.getMap().getCenter()
            const centerPoint = [mapCenter.getLng(), mapCenter.getLat()]

            this.setCenterPoint(centerPoint)
          },
          moveend: () => {
            this.getCenterAddress()
          },
        },
      },
      plugin: ['ToolBar', {
        pName: 'PlaceSearch', // poi 搜索插件
        events: {
          init: (instance) => {
            this.plugins.placesearch = instance
          },
        },
      }, {
        pName: 'Geolocation', // 定位插件
        events: {
          init: (instance) => {
            instance.getCurrentPosition((status, result) => {
              // 设置定位按钮不可见
              window.document.getElementsByClassName('amap-geolocation-con')[0].style.display = 'none'

              if (
                result
                && result.position
              ) {
                const centerPoint = [result.position.lng, result.position.lat]
                const currentCity = result.addressComponent.city

                this.setCurrentCity(currentCity)
                this.setCenterPoint(centerPoint)
              }
              this.getCenterAddress()
            })
          },
        },
      }, {
          pName: 'Autocomplete', // 搜索关键词自动补全插件
          events: {
            init: (instance) => {
              this.plugins.autocomplete = instance
              this.plugins.autocomplete.citylimit = true
            },
          },
        },],
      plugins: {
        placesearch: {}, // 附近poi搜索实例
        geocoder: {}, // 地址查询实例
        autocomplete: {}, // 搜索补全实例
        districtSearch: {}, // 行政区域搜索实例
      },
      isSearching: false,
      result: {
        pois: [],
      },
      currentCity: '',
    }
  },
  methods: {
    /**
     * search event
     * @param {String} searchField - search field
     */
    handleSearch(searchField) {
      console.log(searchField)
    },
    /**
     * get address by center point
     */
    getCenterAddress() {
      this.getAddress(this.uiComponentModel.center, this)
    },
    /**
     * get address by location point
     * @param {Array} point - point with [lng, lat]
     * @param {Object} self - current vue instance
     */
    getAddress: _.throttle((point, self) => {
      if (self.isSearching) return

      self.isSearching = true

      self.plugins.placesearch.searchNearBy('', point, 1000, (status, result) => {
        console.log(status, result)
        if (
          result.info === 'OK'
          && result.poiList.count > 0
        ) {
          self.result.pois = result.poiList.pois

          self.isSearching = false
        }
      })
    }, 500, { loading: false }),
    /**
     * set value of center-point
     * @param {Array} centerPoint - target value
     */
    setCenterPoint(centerPoint) {
      this.$set(this.uiComponentModel, 'center', centerPoint)
    },
    /**
     * set value of is-searching
     * @param {Boolean} value - target value
     */
    setSearchStatus(value) {
      if (this.isSearching === value) return

      this.isSearching = value
    },
    /**
     * set current city
     * @param {String} city - city name
     */
    setCurrentCity(city) {
      this.currentCity = city
    },
  },
}
</script>

<style lang="stylus">
.amap-ui-compoent-wrapper
  height 400px
</style>
