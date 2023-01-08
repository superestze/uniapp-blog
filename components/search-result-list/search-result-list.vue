<template>
  <view class="search-result-list-container">
    <empty-data v-if="isEmpty"></empty-data>

    <!-- 1. 通过 mescroll-body 包裹列表，指定 ref 为 mescrollRef ，监听@init、@down、@up 事件 -->
    <mescroll-body v-else ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
      <!-- 循环渲染列表数据 -->
      <block v-for="(item, index) in resultList" :key="index">
        <view @click="onItemClick(item)" class="search-result-item-box">
          <!-- 内容区 - 样式 1 -->
          <search-result-item-theme-1 v-if="!item.pic_list || item.pic_list.length === 0" :data="item" />

          <!-- 内容区 - 样式 2 -->
          <search-result-item-theme-2 v-else-if="item.pic_list.length === 1" :data="item" />

          <!-- 内容区 - 样式 3 -->
          <search-result-item-theme-3 v-else :data="item" />
        </view>
      </block>
    </mescroll-body>
    <!-- 循环渲染列表数据 -->

  </view>
</template>

<script>
  import {
    getSearchResult
  } from 'api/search';
  import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
  export default {
    name: 'search-result-list',
    mixins: [MescrollMixin],
    props: {
      // 搜索关键字
      queryStr: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        // 数据源
        resultList: [],
        // 页数
        page: 1,
        isInit: true,
        mescroll: null,
        isEmpty: false
      };
    },
    created() {
      // this.loadSearchResult();
    },
    mounted() {
      this.mescroll = this.$refs.mescrollRef.mescroll
    },
    methods: {
      onItemClick(item) {
        uni.navigateTo({
          url: "/subpkg/pages/blog-detail/blog-detail",
        });
      },
      // 3. 注册 mixins
      // 4. 实现三个回调方法
      /**
       * 首次加载
       */
      async mescrollInit() {
        await this.loadSearchResult()
        this.isInit = false
        this.mescroll.endSuccess();
      },
      /**
       * 下拉刷新的回调
       */
      async downCallback() {
        if (this.isInit) {
          return
        }
        this.page = 1;
        await this.loadSearchResult()
        this.mescroll.endSuccess()
      },
      /**
       * 上拉加载的回调
       */
      async upCallback() {
        if (this.isInit) return;
        this.page += 1
        await this.loadSearchResult()
        this.mescroll.endSuccess()
      },
      /**
       * 获取搜索数据
       */
      async loadSearchResult() {
        const {
          data: res
        } = await getSearchResult({
          q: this.queryStr,
          p: this.page
        });
        if (this.page === 1) {
          this.resultList = res.list;
        } else {
          this.resultList = [...this.resultList, ...res.list]
        }

        if (this.resultList.length === 0) {
          this.isEmpty = true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search-result-list-container {
    padding: $uni-spacing-col-lg $uni-spacing-row-lg;

    .search-result-item-box {
      margin-bottom: $uni-spacing-col-big;
    }
  }
</style>
