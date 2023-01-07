<template>
  <view class="search-history-container">
    <view class="search-history-title-box">
      <view class="search-history-title"></view>
      <view v-if="!isShowClear">
        <uni-icons type="trash" @click="isShowClear = true"></uni-icons>
      </view>
      <view v-else>
        <text class="txt">全部删除</text>
        <text class="txt" @click="isShowClear = false">完成</text>
      </view>

      <view class="search-history-box">
        <block v-for="(item, index) in searchData" :key="index">
          <view class="search-history-item">
            <text class="history-txt line-clamp">{{ item }}</text>
            <uni-icons v-show="isShowClear" type="clear"></uni-icons>
          </view>
        </block>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isShowClear: false,
      searchData: ["sunday", "uniapp", "vue"],
    };
  },
};
</script>

<style lang="scss"></style>
