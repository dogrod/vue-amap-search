<template lang="html">
  <div class="">
    高德地图位置选择组件
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
    <ul v-show="searchResults.length">
      <li v-for="result in searchResults">
        <div>
          名称：{{ result.name }}
        </div>
        <div>
          地址：{{ result.address }}
        </div>
        <div>
          距离：{{ result.distance }}米
        </div>
      </li>
    </ul>
    <div v-show="!searchResults.length">暂无数据</div>
  </div>
</template>

<script>
  import { AMapManager } from 'vue-amap'
  let amapManager = new AMapManager()
  export default {
    data() {
      let self = this
      return {
        vid: 'amap-vue-1',
        zoom: 15,
        center: [120.21440818650825, 30.253264929440956],
        markers: [
          [120.21440818650825, 30.253264929440956]
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
          pName: 'PlaceSearch',
          events: {
            init(o) {
              self.placesearch = o
            }
          }
        }, {
          pName: 'Geolocation',
          events: {
            init(instance) {
              instance.getCurrentPosition((status, result) => {
                console.log(result)
                self.center = [result.position.lng, result.position.lat]
                self.searchPoint([result.position.lng, result.position.lat])
              })
            }
          }
        }],
        placesearch: '',
        searchResults: []
      }
    },
    methods: {
      searchPoint(point) {
        // if (typeof (this.placesearch) === 'object') {
        this.placesearch.searchNearBy('小区,商场', point, 1000, (status, result) => {
          console.log(result)
          this.searchResults = []
          if (result.poiList) {
            this.searchResults = result.poiList.pois
          }
        })
        console.log('result')
        // }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  ul {
      list-style: none;

      font-size: 12px;
      -webkit-padding-start: 0;

      >li:not(:first-child) {
        border-top: 1px solid #aaa;
      }
  }

  .map-container {
    height: 400px;
  }
</style>
