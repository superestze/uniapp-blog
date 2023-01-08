<!-- 热搜列表组件 -->
<template>
  <view class="search-hot-list-container">
    <view class="search-hot-title">慕课热搜-全网技术-一网打尽 </view>
    <block v-for="(item, index) in hotList" :key="index">
      <view class="search-hot-item" @click="onItemClick(item)">
        <hot-ranking :ranking="index + 1"></hot-ranking>
        <text class="title line-clamp">{{ item.label }}</text>
        <image class="search-hot-icon" src="/static/images/hot-icon.png" v-if="index <= 2"></image>
      </view>
    </block>
  </view>
</template>

<script>
  import {
    getSearchHotList
  } from "../../api/search";
  export default {
    // 1. 先获取热搜列表的内容
    data() {
      return {
        hotList: [],
      };
    },
    created() {
      this.loadSearchHotList();
    },
    methods: {
      async loadSearchHotList() {
        const {
          data: res
        } = await getSearchHotList();

        this.hotList = res.list;
      },
      onItemClick(item) {
        this.$emit("onSearch", item);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .search-hot-list-container {
    .search-hot-title {
      font-weight: bold;
      color: $uni-text-color-hot;
      padding: 0 $uni-spacing-col-lg $uni-spacing-col-lg $uni-spacing-col-lg;
      margin: 0 -12px $uni-spacing-col-lg -12px;
      box-shadow: 2px 2px 2px 1px rgba(143, 143, 143, 0.1);
    }

    .search-hot-item {
      display: flex;
      align-items: center;
      padding: $uni-spacing-col-lg 0;

      .title {
        color: $uni-text-color;
        font-size: $uni-text-color-grey;
        margin: 0 $uni-spacing-row-base;
      }

      .search-hot-icon {
        width: 14px;
        height: 14px;
      }
    }
  }
</style>
