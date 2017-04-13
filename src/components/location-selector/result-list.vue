<template lang="html">
  <ul v-show="searchResult.length" :style="styles">
    <li v-for="result in searchResult" @click="handleClick(result)">
      <span :style="{ 'width' : addressWidth }">
        <div>
          名称：{{ result.name }}
        </div>
        <div>
          地址：{{ result.address }}
        </div>
      </span>
      <span class="result-distance" v-show="result.distance">
        距离：{{ result.distance }}米
      </span>
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      searchResult: Array,
      geocoder: {
        type: Object,
        required: true,
        default: {}
      },
      clientHeight: Number,
      clientWidth: Number
    },
    computed: {
      styles() {
        return {
          height: (Number(this.clientHeight - 400)) + 'px'
        }
      },
      addressWidth() {
        return (this.clientWidth - 130) + 'px'
      }
    },
    methods: {
      /**
       * 点击事件，组装数据，emitselected事件
       * @param {Object} location 位置信息
       */
      handleClick(location) {
        this.getAddress(location).then((address) => {
          this.$emit('selected', address)
        })
      },
      /**
       * 获取行政区域，组成详细地址
       * @param {Object} location 位置信息
       * @return {Object} 返回获得详细信息的方法
       */
      getAddress(location) {
        return new Promise((resolve) => {
          this.geocoder.getAddress(
            [location.location.lng, location.location.lat],
            (status, result) => {
              let addressDetail = result.regeocode.addressComponent
              let obj = {
                district: `${addressDetail.province} / ${addressDetail.city} / ${addressDetail.district}`,
                detail: location.address
              }
              resolve(obj)
            }
          )
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  ul {
    margin: 0px;
    padding: 0 20px;

    overflow: auto;
    list-style: none;
    font-size: 14px;

    >li{
      display: flex;
      justify-content: space-between;
      padding: 5px 10px;

      text-align: left;

      &:not(:first-child) {
        border-top: 1px solid #ddd;
      }

      .result-distance {
        width: 90px;
      }
    }
  }
</style>
