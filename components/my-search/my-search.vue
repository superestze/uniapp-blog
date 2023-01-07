<template>
  <view class="my-search-container">
    <!-- 搜索输入框 -->
    <uni-search-bar
      @confirm="onSearch"
      @clear="onClear"
      @focus="onFocus"
      @blur="onBlur"
      @cancel="onCancel"
      @input="onInput"
      :value="value"
      class="my-search-bar"
      :placeholder="placeholderText"
      :radius="100"
      :bgColor="config.backgroundColor"
      v-if="isShowInput"
    >
      <uni-icons slot="clearIcon" type="clear" color="#999999" />
    </uni-search-bar>
    <view v-else class="my-search-box">
      <image src="@/static/images/search.png" class="icon"></image>
      <text class="placeholder">{{ placeholderText }}</text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
    },
    config: {
      type: Object,
      default: () => ({
        height: 36,
        backgroundColor: "#ffffff",
        icon: "/static/images/search.png",
        textColor: "#454545",
        border: "1px solid #c9c9c9",
      }),
    },
    isShowInput: {
      type: Boolean,
      default: false,
    },
    placeholderText: {
      type: String,
      default: "搜索",
    },
  },
  data() {
    return {};
  },
  methods: {
    onSearch() {
      this.$emit("search", this.value);
    },
    // 获取焦点
    onFocus() {
      this.$emit("focus", this.value);
    },
    // 失去焦点
    onBlur() {
      this.$emit("blur", this.value);
    },
    onCancel() {
      this.$emit("cancel", this.value);
    },
    onInput(value) {
      this.$emit("input", value);
    },
    onClear() {},
  },
};
</script>

<style lang="scss" scoped>
.my-search-container {
  display: flex;
  align-items: center;

  .my-search-box {
    height: 36px;
    width: 100%;
    background-color: $uni-bg-color;
    border-radius: 15px;
    border: 1px solid $uni-bg-color-grey;
    display: flex;
    align-items: center;
    padding: 0 $uni-spacing-row-base;

    .icon {
      width: $uni-img-size-sm;
      height: $uni-img-size-sm;
    }

    .placeholder {
      font-size: $uni-font-size-sm;
      margin-left: $uni-spacing-row-sm;
      color: $uni-text-color-grey;
    }
  }
}
</style>
