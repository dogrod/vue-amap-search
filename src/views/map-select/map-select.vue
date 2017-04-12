<template lang="html">
  <div>
    <button type="button"
            name="button"
            @click="handleClick">选择地址</button>
    <div>
      行政区域：{{ address.district }}
    </div>
    <div>
      详细地址：{{ address.detail }}
    </div>
    <location-selector v-model="showSelector"
                       @selected="handleSelected"></location-selector>
  </div>
</template>

<script>
  import locationSelector from '../../components/location-selector/location-selector'
  export default {
    components: {
      locationSelector
    },
    data() {
      return {
        showSelector: false,
        address: {
          district: '',
          detail: ''
        }
      }
    },
    methods: {
      handleSelected(address) {
        this.address = address
      },
      handleClick() {
        this.showSelector = !this.showSelector
      }
    }
  }
</script>

<style lang="stylus">
</style>
