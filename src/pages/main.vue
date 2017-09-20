<template>
  <div class="mainContainer">
    <swiper
      class="indexSwiper"
      :options="swiperOption"
      ref="mySwiper"
    >
      <swiper-slide
        class="singleSlide"
        v-for="(imgItem, index) in items"
        :key="index"
      >
        <img
          :src="imgItem.imgPath"
          :alt="imgItem.name"
        />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

    <top-product-card :items="topProducts" />

    <h2 class="productListTitle">
      特色推荐<span>HOT</span>
      <label @click="isEyeOpen = !isEyeOpen" v-bind:class="isEyeOpen ? 'eyeOpen' : ''"></label>
    </h2>
    <ul v-if="specialProducts && specialProducts.length > 0" class="productlist">
      <li v-for="(item, index) in specialProducts">
        <insure-card
          :image="item.imgPath"
          :title="item.productName"
          :descript="item.productFeature"
          :price="item.minPremium"
          :commission="item.promotionFee"
          :id="item.id"
          :code="item.productCode"
          :extrastyle="index === 0 ? { border: 'none' } : null"
          :iseyeopen="isEyeOpen"
        />
      </li>
    </ul>
  </div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import { mapActions, mapState } from 'vuex'
  import topProductCard from '@/components/product/topProductCard'
  import insureCard from '@/components/product/insureCard'

  export default {
    name: 'main',
    data() {
      return {
        swiperOption: {
          autoplay: 3500,
          setWrapperSize: true,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          observeParents: true,
          loop: true,
        },
        isEyeOpen: true,
      }
    },
    components: {
      swiper,
      swiperSlide,
      topProductCard,
      insureCard,
    },
    methods: {
      ...mapActions('advertise', ['getAdvertise']),
      ...mapActions('products', ['getProducts']),
      ...mapActions('ui', ['showErrorToast']),
    },
    computed: {
      ...mapState('advertise', ['items']),
      ...mapState('products', ['topProducts', 'specialProducts', 'error']),
      swiper() {
        return this.$refs.mySwiper.swiper
      },
    },
    created() {
      this.getAdvertise()
      this.getProducts()
    },
    watch: {
      error(newVal) {
        if (newVal) {
          this.showErrorToast(newVal.msg)
        }
      },
    },
  }
</script>

<style lang="scss">
  @import '~theme/colors';
  @import '~theme/function';
  .mainContainer{
    overflow: hidden;
    background-color: $grey-e5;
    color: $black;
    .indexSwiper{
      position: relative;
      height: rem-calc(190px);
      overflow:hidden;
      .singleSlide{
        img{
          width: 100%;
          height: 100%;
        }
      }
      .swiper-pagination{
        position: absolute;
        bottom: 0;
        left: 0;
        padding-right: rem-calc(15px);
        height: rem-calc(30px);
        line-height: rem-calc(30px);
        text-align: right;
        width: 100%;
        box-sizing: border-box;
        .swiper-pagination-bullet{
          margin: 0  0 0 rem-calc(10px) ;
          display: inline-block;
          width: rem-calc(10px);
          height: rem-calc(10px);
          border-radius: rem-calc(5px);
          background-color: $grey-e5;
          opacity: 1;
          &.swiper-pagination-bullet-active{
            background-color: $white;
          }
        }
      }
    }
    .productListTitle{
      margin-top: rem-calc(10px);
      position: relative;
      height: rem-calc(50px);
      line-height:  rem-calc(50px);
      text-align: center;
      font-size:  rem-calc(18px);
      font-weight: 700;
      background-color: #fff;
      border-bottom: rem-calc(1px) solid $grey-e5;
      span{
        color: #ff6d30;
        margin-left:  rem-calc(5px);
      }
      label{
        position: absolute;
        top: 50%;
        margin-top: rem-calc(-5px);
        right: rem-calc(15px);
        display: block;
        width: rem-calc(20px);
        height: rem-calc(10px);
        background-image: url('/assets/eye_close.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        &.eyeOpen{
          margin-top: rem-calc(-7px);
          height: rem-calc(14x);
          background-image: url('/assets/eye_open.png');
        }
      }

    }
    .productlist{
      background-color: $white;
      margin-bottom: rem-calc(15px);
    }
  }
</style>
