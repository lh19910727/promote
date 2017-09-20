<template>
    <div class="product_ele" @click="insureDetail(id,code)" v-bind:style="extrastyle">
        <div v-lazy:background-image="image"></div>
        <div class="product_info">
          <div class="product_title">{{title}}</div>
          <p class="product_descript">{{descript}}</p>
          <div class="product_money">
            <span class="product_price">￥<font>{{price}}</font>元起</span>
            <div v-if="iseyeopen" class="product_commission">推广费{{commission}}%</div>
          </div>
        </div>
    </div>
</template>

<script>

export default {
  props: [
    'image',
    'title',
    'descript',
    'price',
    'commission',
    'id',
    'code',
    'extrastyle',
    'iseyeopen',
  ],
  methods: {
    insureDetail(n, code) {
      this.$router.push({ path: '/edoctor', query: { productId: n, productCode: code } })
    },
  },
}
</script>

<style lang='scss' rel="stylesheet/scss">
@import '~theme/function';
@import '~theme/colors';
.product_ele{
  box-sizing: border-box;
  margin-left: rem-calc(15px);
  padding: rem-calc(15px) 0;
  padding-right: rem-calc(15px);
  background: $white;
  background-repeat: no-repeat;
  border-top: rem-calc(1px) solid $grey-e5;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  &>div:first-child{
    width:rem-calc(120px);
    height: rem-calc(90px);
    background-size:100% 100%;
    background-repeat: no-repeat;
	  border-radius: rem-calc(3px);
  }
  .product_info{
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    aligin-items: start;
    height: rem-calc(90px);
    padding-left: rem-calc(10px);
    .product_title{
        font-size:rem-calc(15px);
    }
    .product_descript{
      color:#9a9a9a;
      font-size:rem-calc(12px);
      display:block;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      max-height: rem-calc(34px);
      line-height: rem-calc(17px);
    }
    .product_money{
      position: relative;
      .product_price{
        min-width:rem-calc(80px);
        color:$primay-orange-shadow-100;
        font-size:rem-calc(12px);
        &>font{
          font-size:rem-calc(18.8px);
          font-weight: bold;
          margin: 0 rem-calc(2px);
        }
      }
      .product_commission{
        float: right;
        padding:0 5px;
        color:$primay-orange-shadow-100;
        font-size:rem-calc(14.3px);
      }
    }
  }
}
</style>
