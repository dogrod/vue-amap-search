<template>
<div class="location-picker">
  <div class="location-picker__search" v-if="!onlyView">
    <search-location
      :placeholder="placeholder"
      :city-limited="currentCity"
      :plugin="plugins.autocomplete"
      @on-selected="handleLocationSelected"
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
        v-if="!onlyView"
        :position="uiComponentModel.center"
      ></el-amap-marker>
      <el-amap-marker
        v-else
        :position="defaultLocation"
      ></el-amap-marker>
    </el-amap>
  </div>
  <div class="location-picker__results" v-if="!onlyView">
    <result-list
      :data="result.pois"
      @on-selected="handleLocationSelected"
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
    defaultLocation: {
      type: Array,
      default: () => [],
    },
    onlyView: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      aMapManager,
      uiComponentModel: {
        center: this.defaultLocation.length ? this.defaultLocation : defaultCenter,
        zoom: 15,
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
          pName: 'Autocomplete', // 搜索关键词自动补全插件
          events: {
            init: (instance) => {
              this.plugins.autocomplete = instance
              this.plugins.autocomplete.citylimit = true
            },
          },
      }, {
          pName: 'Geocoder', // 地点详情检索插件
          events: {
            init: (instance) => {
              this.plugins.geocoder = instance
            }
          }
      }, {
        pName: 'DistrictSearch', // 行政区域搜索插件
        events: {
          init: (instance) => {
            this.plugins.districtSearch = instance
          }
        },
      }],
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
     * location selected event handler
     * @param {Object} locationObject - location object
     */
    handleLocationSelected(locationObject) {
      if (!locationObject.location  && !locationObject.location.lng) return

      const formattedAddressObject = {}
      formattedAddressObject.location = locationObject.location

      this.plugins.geocoder.getAddress(
        [locationObject.location.lng, locationObject.location.lat],
        (status, result) => {
          const addressComponent = result.regeocode.addressComponent
          const locationDetail = {
            id: locationObject.id,
            name: locationObject.name,
            address: locationObject.address,
          }

          const addressDetail = Object.assign({}, addressComponent, locationDetail)

          formattedAddressObject.addressDetail = addressDetail
          
          this.emitSelected(formattedAddressObject)
        }
      )
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
    /**
     * emit on-selected event when location selected
     * @param {Object} result - location object
     */
    emitSelected(result) {
      this.$emit('on-selected', result)
    },
  },
  mounted() {
    if (!this.onlyView) {
      this.plugin.push({
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
      })
    }
  },
}
</script>

<style lang="stylus">
.amap-ui-compoent-wrapper
  height 400px
</style>
