<template>
  <view>
    <!--  -->
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
      tableData: {
        tyoe: Array,
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
