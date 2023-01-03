<template>
  <view class="hot-container">
    <image class="logo" src="@/static/images/logo.png" mode="aspectFit"></image>
    <view class="search-box">
      <my-search :placeholderText="placeholderText"></my-search>
    </view>
  </view>
</template>

<script>
  import {
    getHotTabs
  } from '../../api/hot.js'
  export default {
    data() {
      return {
        placeholderText: "uni-app 自定义组件"
      };
    },
    created() {
      this.loadHotTabs()
    },
    methods: {
      async loadHotTabs() {
        const res = await getHotTabs()
        console.log(res)
      }
    }
  }
</script>

<!-- 当前文件的样式只在当前文件中生效 -->
<style lang="scss" scoped>
  .hot-container {
    background-color: $uni-bg-color;

    .logo {
      width: 100%;
      height: 80px;
    }

    .search-box {
      padding: 0 16px;
      margin-bottom: 8px;
    }
  }
</style>
