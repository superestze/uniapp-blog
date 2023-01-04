<template>
  <view>
    <view class="tab-container">
      <view class="tab-box">
        <scroll-view :scroll-left="scrollLeft" class="scroll-view" scroll-with-animation scroll-x>
          <view class="scroll-content">
            <view class="tab-item-box">
              <block v-for="(item, index) in tabData" :key="index">
                <view :id="'_tab_'+index"
                      :class="{'tab-item-active': activeIndex === index}"
                      :style="{
                        color: activeIndex === index ? defaultConfig.activeTextColor : defaultConfig.textColor
                      }"
                      class="tab-item"
                      @click="onTabClick(index)"
                >

                  {{ item.label || item }}
                </view>

              </block>
            </view>
            <view :style="{
              transform: 'translateX(' + slider.left + 'px)',
              width: defaultConfig.underLineWidth + 'px',
              height: defaultConfig.underLineHeight + 'px',
              backgroundColor: defaultConfig.underLineColor
            }" class="underline">
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
      default: () => {
      }
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
      // 内部维护的数据对象
      tabList: [],
      activeIndex: -1,
      slider: {
        left: 0
      },
      scrollLeft: 0,
      // 定义下划线的宽高
      defaultConfig: {
        underLineWidth: 24,
        underLineHeight: 2,
        underLineColor: '#f94d2a',
        textColor: '#333333',
        activeTextColor: '#f94d2a'
      }
    };
  },
  watch: {
    config: {
      handler(value) {
        this.defaultConfig = {...this.defaultConfig, ...value}
      },
      immediate: true
    },
    tabData: {
      handler(value) {
        this.tabList = value
        setTimeout(() => {
          this.updateTabWidth()
        }, 0)
      },
      immediate: true
    },
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
      this.tabToIndex()
      this.$emit('tabClick', index)
    },
    // 计算滑块的滚动
    tabToIndex() {
      const index = this.activeIndex
      this.slider = {
        left: this.tabList[index]._slider.left
      }
      //   控制滚动条横向滚动
      this.scrollLeft = this.activeIndex * this.defaultConfig.underLineWidth
    },
    updateTabWidth() {
      let data = this.tabList
      if (data.length === 0) return;
      const query = uni.createSelectorQuery().in(this)

      data.forEach((item, index) => {
        query.select('#_tab_' + index).boundingClientRect(
            // res 是获取到的dom
            (res) => {
              item._slider = {
                left: res.left + (res.width - this.defaultConfig.underLineWidth) / 2
              }
              if (data.length - 1 === index) {
                this.tabToIndex()
              }
            }
        ).exec()
      })
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

        .underline {
          height: 2px;
          width: 24px;
          background-color: $uni-text-color-hot;
          border-radius: 3px;
          transition: 0.5s;
          position: absolute;
          bottom: 0;
        }
      }
    }
  }

}
</style>
