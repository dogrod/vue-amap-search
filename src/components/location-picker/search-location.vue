<template>
<div class="search-location">
  <input
    class="search-location__field"
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
</template>

<script>
import _ from 'lodash'

export default {
  name: 'SearchLocation',
  props: {
    placeholder: {
      type: String,
    },
    plugin: {
      type: Object,
      default: () => { return {} },
    },
  },
  data() {
    return {
      searchField: '',
    }
  },
  methods: {
    /**
     * search evenet
     */
    handleSearch() {
      if (!this.searchField.trim()) return

      this.fetchSearchResult()
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
.search
  &-location
    display flex

    width 100%
    padding 14px

    font-size 32px

    &__field
      flex-grow 1

    &__button
      height 100%

      border none
</style>
