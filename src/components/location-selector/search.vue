<template lang="html">
  <div class="search-bar">
    <input type="text"
           placeholder="搜索地点"
           v-model="searchValue"
           @input="handleInput"/>
    <button type="button"
            name="button"
            v-show="searchValue"
            @click="handleClick">
            搜索
          </button>
    <div class="autocomplete" v-show="autocompleteResults.length">
      <ul>
        <li v-for="autocompleteResult in autocompleteResults" @click="handleClickAutocomplete(autocompleteResult)">{{ autocompleteResult.name }} <br/> {{ autocompleteResult.address }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placesearch: Object,
    autocomplete: Object,
    city: String
  },
  data() {
    return {
      searchValue: '',
      autocompleteResults: []
    }
  },
  methods: {
    /**
     * 输入框输入事件
     */
    handleInput() {
      this.fetchAutoComplete()
    },
    /**
     * 点击搜索按钮事件
     */
    handleClick() {
      this.placesearch.setCity(this.city)
      this.placesearch.search(this.searchValue, (status, result) => {
        this.$emit('gotResult', result)
      })
    },
    handleClickAutocomplete(autocompleteResult) {
      let location = [autocompleteResult.location.lng, autocompleteResult.location.lat]
      this.searchValue = autocompleteResult.name
      this.autocompleteResults = []
      this.$emit('selected', location)
      console.log(autocompleteResult, location)
    },
    /**
     * 输入事件
     */
    fetchAutoComplete() {
      this.autocomplete.setCity(this.city)
      if (!this.searchValue) {
        return false
      }
      this.autocomplete.search(this.searchValue, (status, result) => {
        console.log(status, result)
        this.autocompleteResults = result.tips
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
  max-width: 500px;

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
  }

  button {
    color: #39f;
    right: 5px;
  }
}

.autocomplete {
  position: absolute;
  top: 45px;

  overflow: auto;
  max-height: 280px;

  background: #fff;
  text-align: left;
  box-shadow: 0 2px 2px rgba(0,0,0,.15);

  ul {
    margin: 0px;
    padding: 0 20px;

    overflow: auto;
    list-style: none;
    font-size: 14px;

    > li:not(:first-child) {
      border-top: 1px solid #eee;
    }
  }
}
</style>
