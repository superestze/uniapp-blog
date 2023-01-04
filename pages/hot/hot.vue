<template>
  <view class="hot-container">
    <image class="logo" mode="aspectFit" src="@/static/images/logo.png"></image>
    <view class="search-box">
      <my-search :placeholderText="placeholderText"></my-search>
    </view>
    <my-tabs :defaultIndex="defaultIndex" :tabData="tabData"></my-tabs>
    <!-- list -->
    <!--
      1. 使用mock 构建list 的数据
      2. 美化样式
      3. 需要获取真实的数据， 通过tab切换
      4. 渲染真实数据
      5. 联动
    -->
    <view>
      <hot-list-item v-for="(item, index) in 50" :key="index">

      </hot-list-item>
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
        placeholderText: "uni-app 自定义组件",
        tabData: [],
        defaultIndex: 0
      };
    },
    created() {
      this.loadHotTabs()
    },
    methods: {
      async loadHotTabs() {
        const {
          data: res
        } = await getHotTabs()
        console.log(res)
        this.tabData = res.list
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
