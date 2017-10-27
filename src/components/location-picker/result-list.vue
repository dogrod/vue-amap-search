<template>
<ul class="result-list">
  <li
    v-for="(result, index) in data"
    v-if="result.id"
    :key="result.id"
    @click="handleClickResult(result)"
  >
    <div class="result__name">
      <span
        class="current-location"
        v-if="index === 0 && showCurrentHint"
      >[当前位置]</span>
      {{ result.name }}
    </div>
    <div class="result__address">
      <span>
        {{ result.district }}
      </span>
      <span v-show="typeof result.address === 'string'">
        {{ result.address }}
      </span>
    </div>
  </li>
</ul>
</template>

<script>
export default {
  name: 'ResultList',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    showCurrentHint: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    /**
     * click result events
     * @param {Object} result - result item in result list
     */
    handleClickResult(result) {
      this.emitSelectedEvent(result)
    },
    /**
     * emit on-selected event
     * @param {Object} result - result object
     */
    emitSelectedEvent(result) {
      this.$emit('on-selected', result)
    },
  },
}
</script>

<style lang="stylus">
.result-list {
  margin: 0
  padding: 10px 5%

  overflow: auto
  list-style: none
  font-size: 28px

  li{
    display: flex
    flex-direction: column
    justify-content: space-around
    padding: 10px

    text-align: left

    &:not(:first-child) {
      border-top: 1px solid #eaeaea
    }

    .result__name {
      color: #404040

      .current-location {
        color: #f0534a
      }
    }

    .result__address {
      color: #aaa
      font-size: 24px
    }
  }
}
</style>
