<template>
<div class="search-location">
  <div class="search-location__field">
    <input
      class="search-location__input"
      type="text"
      v-model="searchField"
      :placeholder="placeholder"
      @keyup.13="handleSearch"
    />
    <button
      class="search-location__button"
      @click="handleSearch"
    >search</button>
  </div>
  <div
    class="search-location__results"
    v-show="results.length"
  >
    <result-list
      :data="results"
      :show-current-hint="false"
      @on-selected="handleLocationSelected"
    ></result-list>
  </div>
</div>
</template>

<script>
import _ from 'lodash'

import resultList from './result-list.vue'

export default {
  name: 'SearchLocation',
  components: {
    resultList,
  },
  props: {
    placeholder: {
      type: String,
    },
    plugin: {
      type: Object,
    },
    cityLimited: {
      type: String,
      default: '杭州市',
    },
  },
  data() {
    return {
      searchField: '',
      results: [],
    }
  },
  methods: {
    /**
     * search evenet
     */
    handleSearch() {
      if (!this.searchField.trim()) return

      this.searchByKeyword(this.searchField)
    },
    /**
     * on-selected event handler of result-list component
     * @param {Object} result - result object
     */
    handleLocationSelected(result) {
      this.$emit('on-selected', result)
    },
    /**
     * search by keyword
     * @param {String} keyword - search key word
     */
    searchByKeyword(keyword) {
      this.fetchSearchResult(keyword, this.cityLimited, this)
    },
    /**
     * fetch search result function
     * @param {String} keyword - search key word
     * @param {Object} self - current instance
     */
    fetchSearchResult: _.throttle((keyword, cityLimited, self) => {
      if (!self.plugin) return

      self.plugin.setCity(cityLimited)

      self.plugin.search(keyword, (status, result) => {
        self.setResults(result.tips || [])
      })
    }, 500, { loading: false }),
    /**
     * set results function
     * @param {Array} results - search results
     */
    setResults(results) {
      this.results = results

      if (!results.length) {
        this.results.push({ address: '没有相关的搜索信息' })
      }
    },
    /**
     * search finished function
     * @param {Object} result - result object to emit
     */
    searchFinished(result) {
      this.$emit('on-search', result)

      this.clearSearchField()
    },
    /**
     * clearc search field function
     */
    clearSearchField() {
      this.searchField = ''
    },
  },
}
</script>

<style lang="stylus">
.search-location
  position relative

  &__field
    display flex
    justify-content center
    align-items center

    width 100%
    padding 20px

    font-size 32px

  &__input
    padding 10px 20px

    border-bottom 1px solid #aaa
    flex-grow 1

  &__button
    height 100%

    border none

  &__results
    position: absolute;
    background: #fff;
    z-index: 2017;
    left: 10px;
    right: 10px;
    border: 1px solid #ccc;
    height: 300px;
    overflow: scroll;
</style>
