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
          <!-- 关注按钮 -->
          <button class="follow" size="mini" @click="onFollowClick">关注</button>
        </view>
        <view class="detail-right">
          <!-- 关注按钮 -->

          <button class="follow" size="mini" :type="articleData.isFollow ? 'primary' : 'default'" :loading="isFollowLoading" @click="onFollowClick">
            {{ articleData.isFollow ? "已关注" : "关注" }}
          </button>
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
    <article-operate @commitClick="onCommit" />
    <!-- 输入评论的popup -->
    <uni-popup ref="popup" type="bottom" @change="onCommitPopupChange">
      <article-comment-commit v-if="isShowCommit" :articleId="articleId" @success="onSendSuccess" />
    </uni-popup>
  </view>
</template>

<script>
import MescrollCompMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-comp.js";
import { getArticleDetail } from "api/article";
import mpHtml from "@/uni_modules/mp-html/components/mp-html/mp-html";
import { mapActions } from "vuex";
import { userFollow } from "api/user";

export default {
  mixins: [MescrollCompMixin],
  components: {
    mpHtml,
  },
  data() {
    return {
      // 作者名
      author: "",
      // 文章 ID
      articleId: "",
      // 文章详情数据
      articleData: null,
      // 关注用户的 loading
      isFollowLoading: false,
      isShowCommit: false,
    };
  },
  onLoad(options) {
    this.author = options.author;
    this.articleId = options.articleId;
    this.loadArticleDetail();
  },
  methods: {
    ...mapActions("user", ["isLogin"]),
    /**
     * 发布评论的 popup 切换事件
     */
    onCommitPopupChange(e) {
      // 修改对应的标记，当 popup 关闭时，为了动画平顺，进行延迟处理
      if (e.show) {
        this.isShowCommit = e.show;
      } else {
        setTimeout(() => {
          this.isShowCommit = e.show;
        }, 200);
      }
    },
    /**
     * 发布评论点击事件
     */
    onCommit() {
      // 通过组件定义的ref调用uni-popup方法
      this.$refs.popup.open();
    },
    /**
     * 发表评论成功
     */
    onSendSuccess() {
      // 关闭弹出层
      this.$refs.popup.close();
      this.isShowCommit = false;
      // 显示评论数据
      this.$refs.mescrollItem.addCommentList(data);
    },
    /**
     *  关注按钮点击事件
     */
    async onFollowClick() {
      // 进行登录判定
      const isLogin = await this.isLogin();
      if (!isLogin) {
        return;
      }
      // 关注用户
      // 开启 button 的 loading
      this.isFollowLoading = true;
      const { data: res } = await userFollow({
        author: this.author,
        isFollow: !this.articleData.isFollow,
      });
      // 修改用户数据
      this.articleData.isFollow = !this.articleData.isFollow;
      // 关闭 button 的 loading
      this.isFollowLoading = false;
    },
    /**
     * 获取文章详情数据
     */
    async loadArticleDetail() {
      // 展示加载框
      uni.showLoading({
        title: "加载中",
      });
      const { data: res } = await getArticleDetail({
        author: this.author,
        articleId: this.articleId,
      });
      this.articleData = res.data;
      console.log(this.articleData);
    },
    /**
     *  关注按钮点击事件
     */
    async onFollowClick() {
      // 进行登录判定
      const isLogin = await this.isLogin();
      if (!isLogin) {
        return;
      }
    },
  },
};
</script>

<style lang="scss">
// 注意：需要删除 scoped
@import "~@/styles/article-detail.scss";

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
