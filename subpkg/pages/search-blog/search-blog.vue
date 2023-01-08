<template>
  <div class="search-blog-container">
    <view class="search-bar-box">
      <my-search @search="onSearchConfirm" @focus="onSearchFocus" @blur="onSearchBlur" @clear="onSearchClear"
        @cancel="onSearchCancel" :config="{
          backgroundColor: '#f1f0f3',
        }" :isShowInput="true" :placeholderText="defaultText" v-model="searchValue"></my-search>
    </view>
    <view class="search-hot-list-box card" v-if="showType === HOT_LIST">
      <search-hot-list @onSearch="onSearchConfirm"></search-hot-list>
    </view>
    <view class="search-history-box" v-else-if="showType === SEARCH_HISTORY">
      <search-history @onSearch="onSearchConfirm"></search-history>
    </view>
    <view class="search-result-list-box" v-else>
      <!-- 1. 给mescroll-body的组件添加: ref="mescrollItem" (固定的,不可改,与mescroll-comp.js对应)-->
      <search-result-list ref="mescrollItem" :queryStr="searchValue" />
    </view>
  </div>
</template>

<script>
  import {
    mapMutations
  } from 'vuex'
  import {
    getDefaultText,
    getHotListFormTabType
  } from "../../../api/search.js";
  import MescrollCompMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-comp.js'
  // 热搜列表
  const HOT_LIST = "0";
  const SEARCH_HISTORY = "1";
  const SEARCH_RESULT = "2";
  export default {
    components: {},
    // 3. 注册 mixins
    mixins: [MescrollCompMixin],
    data() {
      return {
        // 输入框的中默认内容
        defaultText: "",
        searchValue: "",
        showType: HOT_LIST,
        HOT_LIST,
        SEARCH_HISTORY,
        SEARCH_RESULT,
      };
    },
    created() {
      this.loadDefaultText();
    },

    methods: {
      ...mapMutations('search', ['addSearchData']),
      async loadDefaultText() {
        const {
          data: res
        } = await getDefaultText();
        console.log(res);
        this.defaultText = res.defaultText;
      },
      /**
       * @description: 搜索内容
       * @param {*} val
       * @return {*}
       */
      onSearchConfirm(val) {
        this.searchValue = val ? val.label : this.defaultText;
        this.addSearchData(this.searchValue);
        if (this.searchValue) {
          this.showType = SEARCH_RESULT;
        }
      },
      /**
       * @description: 获取焦点
       * @param {*} val
       * @return {*}
       */
      onSearchFocus(val) {
        this.showType = SEARCH_HISTORY;
      },
      /**
       * @description: 失去焦点
       * @param {*} val
       * @return {*}
       */
      onSearchBlur(val) {},
      /**
       * @description: 清除搜索内容
       * @param {*} val
       * @return {*}
       */
      onSearchClear(val) {
        this.showType = SEARCH_HISTORY;
      },
      /**
       * @description: 取消搜索
       * @return {*}
       */
      onSearchCancel() {
        this.showType = HOT_LIST;
      },
      /**
       * @description: 保存搜索数据
       * @return {*}
       */
      // saveSearchData() {
      //   const index = this.searchData.findIndex((item) => item === this.searchValue);
      //   if (index !== -1) {
      //     this.searchData.splice(index, 1);
      //   }
      //   this.searchData.unshift(this.searchValue);
      // },
      // removeAllSearchData() {
      //   this.searchData = [];
      // },
      // removeSearchData(index) {
      //   this.searchData.splice(index, 1);
      // },
    },
  };
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
