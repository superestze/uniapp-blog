<template>
  <view class="ranking-container">
    <image class="ranking-bg" :src="getRankingBg"></image>
    <text class="ranking-text" :class="{'text-white': ranking <= 3}">{{ranking}}</text>
  </view>
</template>

<script>
  export default {
    name: "hot-ranking",
    props: {
      ranking: {
        type: Number,
        require: true
      }
    },
    data() {
      return {

      };
    },
    computed: {
      getRankingBg() {
        if (this.ranking <= 3) {
          return require(`@/static/images/ranking-${this.ranking}.png`)
        }
        return require(`@/static/images/ranking-other.png`)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ranking-container {
    position: relative;
    text-align: center;
    width: 18px;
    height: 20px;

    .ranking-bg {
      width: 100%;
      height: 100%;
    }

    .ranking-text {
      position: absolute;
      left: 50%;
      height: 50%;
      transform: translate(-60%, -15%);
      font-size: $uni-font-size-sm;
      font-weight: bold;
      color: $uni-text-color;
    }

    .text-white {
      color: white;
    }
  }
</style>
