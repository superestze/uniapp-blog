<template>
  <view>
    <view class="tab-container">
      <view class="tab-box">
        <scroll-view scroll-x scroll-with-animation>
          <view class="scroll-content">
            <view class="tab-item-box">
              <block v-for="(item, index) in tabData" :key="index">
                <view class="tab-item">
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

      };
    }
  }
</script>

<style lang="scss">

</style>
