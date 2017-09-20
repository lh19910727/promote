<template>
  <div
    class="content flex1 layoutColumn layoutStartStart"
    v-lazy:background-image="item.adPath"
    v-tap="{ methods:goToProductDetail, product: item }"
  >
    <h2>{{ item.productNameAbridge }}</h2>
    <h3 v-if="item.productInfo">{{ item.productInfo }}</h3>
  </div>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        default() {
          return {
            imgPath: '',
            productNameAbridge: '',
            productInfo: '',
          }
        },
      },
    },
    methods: {
      goToProductDetail({ product: { id, productCode } }) {
        this.$router.push({ path: '/edoctor', query: { productId: id, productCode } })
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import '~theme/function';
  @import '~theme/flexLayout';
  @import '~theme/colors';
  .content{
    box-sizing: border-box;
    background-size: 100% 100%;
    background-position: center center;
    h2{
      margin-left: rem-calc(16px);
      color: $black;
      font-size: rem-calc(14px);
      font-weight: bold;
      margin-bottom: rem-calc(7.5px);
    }
    h3{
      margin-left: rem-calc(16px);
      color: $grey-66;
      font-size: rem-calc(12px);
      font-weight: normal;
      word-break: break-all;
      margin-bottom: rem-calc(7.5px);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      max-height: rem-calc(34px);
      line-height: rem-calc(17px);
    }
    .topProductBtn{
      margin-left: rem-calc(16px);
      display: inline-block;
      box-sizing: border-box;
      height: rem-calc(22.5px);
      line-height: rem-calc(21px);
      border: rem-calc(1px) solid #159dff;
      border-radius: rem-calc(11px);
      color: #159dff;
      padding: 0 rem-calc(6px);
      font-size: rem-calc(12px);
      white-space: nowrap;
      &.flightInsurance{
        color: #60d2a9;
        border-color: #60d2a9;
      }
      &.driveInsurance{
        color: #ff9e30;
        border-color: #ff9e30;
      }
    }
  }
</style>
