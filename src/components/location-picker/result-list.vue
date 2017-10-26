<template>
<ul class="result-list">
  <li
    v-for="(result, index) in data"
    :key="result.id"
    @click="handleClickResult(result)"
  >
    <div class="result__name">
      <span v-if="index === 0" class="current-location">[当前位置]</span>{{ result.name }}
    </div>
    <div class="result__address">{{ result.address }}</div>
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
  },
  methods: {
    /**
     * click result events
     * @param {Object} result - result item in result list
     */
    handleClickResult(result) {
      console.log(result)
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
