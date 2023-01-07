<template>
  <div class="search-blog-container">
    <view class="search-bar-box">
      <my-search @search="onSearchComfirm" @focus="onSearchFocus" @blur="onSearchBlur" @clear="onSearchClear"
        @cancel="onSearchCancel" :config="{
        backgroundColor: '#f1f0f3'
      }" :isShowInput="true" :placeholderText="defaultText" v-model="searchValue"></my-search>
    </view>
  </div>
</template>

<script>
  import {
    getDefaultText,
    getHotListFormTabType
  } from '../../../api/search.js'
  export default {
    components: {

    },
    data() {
      return {
        defaultText: '',
        searchValue: ''
      }
    },
    created() {
      this.loadDefaultText()
    },

    methods: {
      async loadDefaultText() {
        const {
          data: res
        } = await getDefaultText()
        console.log(res)
        this.defaultText = res.defaultText
      },
      onSearchComfirm(val) {

      },
      onSearchFocus(val) {

      },
      onSearchBlur(val) {

      },
      onSearchClear(val) {

      },
      onSearchCancel() {

      }
    }
  }
</script>

<style lang="scss" scoped>
  .search-blog-container {
    .search-bar-box {
      background-color: $uni-bg-color;
      padding: $uni-spacing-col-sm;
      position: sticky;
      top: 0px;
      z-index: 9;
    }
  }
</style>
