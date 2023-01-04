<template>
  <view>
    <view class="tab-container">
      <view class="tab-box">
        <scroll-view class="scroll-view" scroll-x scroll-with-animation>
          <view class="scroll-content">
            <view class="tab-item-box">
              <block v-for="(item, index) in tabData" :key="index">
                <view @click="onTabClick(index)" class="tab-item" :class="{'tab-item-active': activeIndex === index}">
                  {{item.label || item}}
                </view>
              </block>
            </view>
          </view>
        </scroll-view>

      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-tabs",
    props: {
      config: {
        type: Object,
        default: () => {}
      },
      tabData: {
        type: Array,
        default: () => []
      },
      defaultIndex: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        activeIndex: -1
      };
    },
    watch: {
      defaultIndex: {
        handler(value) {
          this.activeIndex = value
        },
        immediate: true
      }
    },
    methods: {
      onTabClick(index) {
        this.activeIndex = index
        this.$emit('tabClick', index)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tab-container {
    font-size: $uni-font-size-base;
    height: 45px;
    line-height: 45px;
    background-color: $uni-bg-color;

    .tab-box {
      width: 100%;
      height: 100%;
      display: flex;
      position: relative;

      .scroll-view {
        white-space: nowrap;
        width: 100%;
        height: 100%;
        box-sizing: border-box;

        .scroll-content {
          width: 100%;
          height: 100%;
          position: relative;

          .tab-item-box {
            height: 100%;

            .tab-item {
              display: inline-block;
              text-align: center;
              padding: 0 15px;
              position: relative;
              color: $uni-text-color;

              &-active {
                color: $uni-text-color-hot;
              }
            }
          }
        }
      }
    }

  }
</style>
