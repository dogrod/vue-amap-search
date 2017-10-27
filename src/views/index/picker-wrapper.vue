<template lang="pug">
.picker-wrapper(v-show="isVisible")
  .picker__header(@click="handleClickBack")
    | Tap to back
  .picker__content
    slot
</template>

<script>
export default {
  name: 'PickerWrapper',
  props: {
    value: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      isVisible: this.value,
    }
  },
  methods: {
    /**
     * click back-to-content button event
     */
    handleClickBack() {
      this.emitCloseEvent()
    },
    /**
     * set is-visible value
     * @param {Boolean} value - target value
     */
    setComponentVisible(value) {
      this.isVisible = value
    },
    /**
     * emit close event
     */
    emitCloseEvent() {
      this.isVisible = false

      this.$emit('input', false)
      this.$emit('close')
    },
  },
  watch: {
    /**
     * watch value change
     * @param {Boolean} value - current value
     * @param {Boolean} oldValue - latest value
     */
    value(value, oldValue) {
      if (value === oldValue) return

      this.setComponentVisible(value)
    },
  },
}
</script>

<style lang="stylus">
@import "~@/assets/styles/variables.styl";

.picker-wrapper
  position absolute
  top 0
  left 0
  right 0
  bottom 0

  background global-background-color

.picker
  &__header
    padding 10px

    border-bottom 1px solid global-border-color
</style>
