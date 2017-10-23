<template>
<div class="location-picker">
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
        :position="uiComponentModel.centerMarker"
      ></el-amap-marker>
    </el-amap>
  </div>
</div>
</template>

<script>
import { AMapManager } from 'vue-amap'
import _ from 'lodash'

const defaultCenter = [120.21440818650825, 30.253264929440956]
const aMapManager = new AMapManager()

export default {
  name: 'LocationPicker',
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

            this.uiComponentModel.center = centerPoint
            this.uiComponentModel.centerMarker = centerPoint


            this.getAddress(centerPoint, this)
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
      }],
      plugins: {
        placesearch: {}, // 附近poi搜索实例
        geocoder: {}, // 地址查询实例
        autocomplete: {}, // 搜索补全实例
        districtSearch: {}, // 行政区域搜索实例
      },
      isSearching: false,
      data: {
        pois: [],
      }
    }
  },
  methods: {
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
          self.data.pois = result.poiList.pois

          self.isSearching = false
        }
      })
    }, 500, { loading: false }),
    /**
     * set value of is-searching
     * @param {Boolean} value - target value
     */
    setSearchStatus(value) {
      if (this.isSearching === value) return

      this.isSearching = value
    },
  },
}
</script>

<style lang="stylus">
.amap-ui-compoent-wrapper
  height 400px
</style>
