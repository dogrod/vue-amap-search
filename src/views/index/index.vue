<template lang="pug">
.index
  h2 AMap Location Picker Component with Vue.js
  button(@click="handleClickSelectLocation") Select Location
  picker-wrapper(v-model="showLocationPicker")
    location-picker
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
