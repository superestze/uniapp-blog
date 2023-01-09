<template>
  <view class="detail-container">
    <!-- 文章内容区域 -->
    <block v-if="articleData">
      <!-- 标题 -->
      <view class="title">{{ articleData.articleTitle }}</view>
      <view class="detail-info">
        <view class="detail-left">
          <view class="avatar-box">
            <!-- 头像 -->
            <image class="avatar" :src="articleData.avatar"></image>
          </view>
          <view class="author-box">
            <!-- 作者 -->
            <text class="author">{{ articleData.nickName }}</text>
            <!-- 发布时间 -->
            <text class="release-time">{{ articleData.date }}</text>
          </view>
        </view>
        <view class="detail-right">
          <!-- 关注按钮 -->
          <button class="follow" size="mini">关注</button>
        </view>
      </view>
      <!-- 文章内容 -->
      <mp-html class="markdown_views" :content="articleData.content" scroll-table />

    </block>
    <!-- 评论列表 -->
    <view class="comment-box">
      <article-comment-list ref="mescrollItem" :articleId="articleId"></article-comment-list>
    </view>

    <!-- 底部功能区 -->
    <article-operate />
  </view>
</template>

<script>
  import MescrollCompMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-comp.js';
  import {
    getArticleDetail
  } from 'api/article';
  import mpHtml from '@/uni_modules/mp-html/components/mp-html/mp-html';
  export default {
    mixins: [MescrollCompMixin],
    components: {
      mpHtml
    },
    data() {
      return {
        // 作者名
        author: '',
        // 文章 ID
        articleId: '',
        // 文章详情数据
        articleData: null
      };
    },
    onLoad(options) {
      this.author = options.author;
      this.articleId = options.articleId;
      this.loadArticleDetail();
    },
    methods: {
      /**
       * 获取文章详情数据
       */
      async loadArticleDetail() {
        // 展示加载框
        uni.showLoading({
          title: '加载中'
        });
        const {
          data: res
        } = await getArticleDetail({
          author: this.author,
          articleId: this.articleId
        });
        this.articleData = res.data;
        console.log(this.articleData);
      }
    }
  };
</script>



<style lang="scss">
  // 注意：需要删除 scoped
  @import '~@/styles/article-detail.scss';

  .detail-container {
    padding: $uni-spacing-col-base $uni-spacing-row-base;

    .title {
      font-size: $uni-font-size-title;
      color: $uni-text-color-title;
      font-weight: bold;
    }

    .detail-info {
      padding: $uni-spacing-col-base 0;
      display: flex;
      justify-content: space-between;

      .detail-left {
        display: flex;

        .author-box {
          margin-left: $uni-spacing-row-base;
          display: flex;
          flex-direction: column;

          .author {
            font-size: $uni-font-size-base;
            font-weight: bolder;
            color: $uni-color-title;
          }

          .release-time {
            font-size: $uni-font-size-sm;
            color: $uni-text-color-grey;
          }
        }
      }

      .detail-right {
        display: flex;
        align-items: center;
      }
    }
  }
</style>
