<template>
  <view class="search-history-container">
    <view class="search-history-title-box">
      <view class="search-history-title"></view>
      <view v-if="!isShowClear">
        <uni-icons type="trash" @click="isShowClear = true"></uni-icons>
      </view>
      <view v-else>
        <text class="txt" @click="onClearAll">全部删除</text>
        <text class="txt" @click="isShowClear = false">完成</text>
      </view>

      <view class="search-history-box">
        <block v-for="(item, index) in searchData" :key="index">
          <view @click="onHistoryItemClick(item, index)" class="search-history-item">
            <text class="history-txt line-clamp">{{ item }}</text>
            <uni-icons v-show="isShowClear" type="clear"></uni-icons>
          </view>
        </block>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    // props: {
    //   searchData: {
    //     type: Array,
    //     require: true,
    //   },
    // },
    data() {
      return {
        isShowClear: false,
      };
    },
    computed: {
      ...mapState('search', ['searchData'])
    },
    methods: {
      ...mapMutations('search', ['removeAllSearchData', 'removeSearchData']),
      onClearAll() {
        uni.showModel({
          title: "提示",
          content: "删除搜索历史数据?",
          showCancel: true,
          success: ({
            confirm,
            cancel
          }) => {
            if (confirm) {
              this.isShowClear = false;
              this.removeAllSearchData()
            }
          },
        });
      },
      onHistoryItemClick(item, index) {
        if (this.isShowClear) {
          this.removeSearchData(index)
        } else {
          this.$emit("onSearch", item);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .search-history-container {
    padding: $uni-spacing-col-lg $uni-spacing-row-lg;

    .search-history-title-box {
      display: flex;

      .search-history-title {
        font-size: $uni-font-size-sm;
        color: $uni-text-color;
        padding: $uni-spacing-col-sm $uni-spacing-row-sm;
      }

      .txt {
        color: $uni-text-color-grey;
        font-size: $uni-font-size-sm;
        padding: $uni-spacing-col-sm $uni-spacing-row-sm;
      }
    }

    .search-history-box {
      margin-top: $uni-spacing-row-lg;

      .search-history-item {
        width: 50%;
        box-sizing: border-box;
        display: inline-block;
        padding: $uni-spacing-col-lg $uni-spacing-row-lg;
        position: relative;

        .history-txt {
          display: inline-block;
          font-size: $uni-font-size-base;
        }

        .search-history-item:nth-child(odd):before {
          content: "";
          border-left: 1px solid #999;
          display: inline-block;
          height: 10px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 0;
        }
      }
    }
  }
</style>
