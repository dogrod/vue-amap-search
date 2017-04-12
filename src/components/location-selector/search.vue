<template lang="html">
  <div class="search-bar">
    <input type="text"
           placeholder="搜索地点"
           v-model="searchValue"/>
    <button type="button"
            name="button"
            v-show="searchValue"
            @click="handleClick">
            搜索
          </button>
  </div>
</template>

<script>
export default {
  props: {
    placesearch: Object,
    city: String
  },
  data() {
    return {
      searchValue: ''
    }
  },
  methods: {
    /**
     * 点击搜索按钮事件
     */
    handleClick() {
      this.placesearch.setCity(this.city)
      this.placesearch.search(this.searchValue, (status, result) => {
        this.$emit('gotResult', result)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.search-bar {
  position: absolute;
  top: 10px;
  left: 5%;

  width: 90%;
  height: 40px;

  font-size: 14px;
  background: #fff;
  border: none;
  border-radius: 3px;
  box-shadow: 0 2px 2px rgba(0,0,0,.15);
  z-index: 999;


  input,
  button {
    position: absolute;
    top: 0;
    height: 40px;

    border: none;
    background: none;
    outline: 0;

    &:first-child {
      padding-left: 10px;
      left: 5px;
    }

    &:last-child {
      color: #39f;
      right: 5px;
    }
  }
}
</style>
