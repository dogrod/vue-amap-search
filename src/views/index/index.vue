<template lang="pug">
.index
  h2 AMap Location Picker Component with Vue.js
  div current location: {{ locationString }}
  button(@click="handleClickSelectLocation") Select Location
  picker-wrapper(v-model="showLocationPicker")
    location-picker(
      @on-selected="handleLocationSelected"
    )
</template>

<script>
import pickerWrapper from './picker-wrapper.vue'
import locationPicker from '@/components/location-picker/location-picker.vue'

export default {
  name: 'IndexPage',
  components: {
    pickerWrapper,
    locationPicker,
  },
  data() {
    return {
      showLocationPicker: false,
      locationString: '',
    }
  },
  methods: {
    /**
     * click select-location button event
     */
    handleClickSelectLocation() {
      if (this.showLocationPicker) return

      this.setShowLocationPicker(true)
    },
    /**
     * location selected event
     * @param {Object} location - location object
     */
    handleLocationSelected(location) {
      this.locationString = JSON.stringify(location)

      this.setShowLocationPicker(false)
    },
    /**
     * set show location Picker
     * @param {Boolean} value - target value
     */
    setShowLocationPicker(value) {
      this.showLocationPicker = value
    },
  },
}
</script>

<style lang="stylus">
</style>
