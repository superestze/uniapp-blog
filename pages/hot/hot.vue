<template>
  <view class="hot-container">
    <image class="logo" mode="aspectFit" src="@/static/images/logo.png"></image>
    <view class="search-box">
      <my-search :placeholderText="placeholderText"></my-search>
    </view>
    <my-tabs @tabClick="onTabClick" :defaultIndex="currentIndex" :tabData="tabData"></my-tabs>
    <!-- list -->
    <!--
      1. 使用mock 构建list 的数据
      2. 美化样式
      3. 需要获取真实的数据， 通过tab切换
      4. 渲染真实数据
      5. 联动
    -->
    <swiper class="swiper" :current="currentIndex" :style="{height: currentSwiperHeight + 'px'}">
      <swiper-item class="swiper-item" v-for="(tabItem, tabIndex) in tabData" :key="tabIndex">
        <view>
          <uni-load-more status="loading" v-if="isLoading"></uni-load-more>
          <block v-else>
            <hot-list-item :class="'hot-list-item-'+tabIndex" v-for="(item, index) in listData[tabIndex]" :data="item"
              :ranking="index+1" :key="index">
            </hot-list-item>
          </block>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  import {
    getHotTabs,
    getHotListFormTabType
  } from '../../api/hot.js'

  export default {
    data() {
      return {
        placeholderText: "uni-app 自定义组件",
        tabData: [],
        currentIndex: 0,
        // 以index 为key, 对应的List 为value
        listData: {},
        isLoading: false,
        currentSwiperHeight: 0,
        swiperHeightData: {}
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
        this.tabData = res.list
        this.loadHotListFormTab()
      },
      // 获取list
      async loadHotListFormTab() {
        // 没有获取过数据和已经获取过数据
        // 没有获取数据， 获取数据后， 存到本地， 
        if (!this.listData[this.currentIndex]) {
          this.isLoading = true
          const id = this.tabData[this.currentIndex].id
          const {
            data: res
          } = await getHotListFormTabType(id)
          this.listData[this.currentIndex] = res.list
          this.isLoading = false
          setTimeout(async () => {
            // 获取到当前的高度
            this.currentSwiperHeight = await this.getCurrentSwiperHeight()
            this.swiperHeightData[this.currentIndex] = this.currentSwiperHeight
          }, 0)
        }
      },

      onTabClick(index) {
        this.currentIndex = index
        this.loadHotListFormTab()
      },
      getCurrentSwiperHeight() {
        return new Promise((resolve, reject) => {
          let sum = 0
          const query = uni.createSelectorQuery().in(this)
          query
            .selectAll(`.hot-list-item-${this.currentIndex}`)
            .boundingClientRect((res) => {
              res.forEach(item => {
                sum += item.height
              })
              resolve(sum)
            })
            .exec()
        })
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
