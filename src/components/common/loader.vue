<template>
  <MaskLayer bgcolor="rgba(0,0,0,1)" >
    <div v-if="status === 'loading'" class="layoutColumn layoutCenterCenter loadingBox">
      <div class="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="loadingText">数据加载中</div>
    </div>
    <div v-if="status === 'error'" class="layoutColumn layoutCenterCenter loadingBox">
      <img class="loader no-animate" :src="errorImg" />
      <div class="loadingText">{{errorText}}</div>
    </div>
    <div v-if="status === 'resolve'" class="layoutColumn layoutCenterCenter loadingBox">
      <img class="loader no-animate" :src="resolveImg" />
      <div class="loadingText">{{resolveText}}</div>
    </div>
  </MaskLayer>
</template>
<style lang='scss' rel="stylesheet/scss">
  @import "~theme/function";
  @import "~theme/colors";
  @import "~theme/flexLayout";
  .loadingBox{
    position: fixed;
    width: rem-calc(120px);
    height: rem-calc(120px);
    border-radius: rem-calc(5px);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color:rgba($black, 0.7);
    z-index: 999;
    .loadingText{
      margin-top: rem-calc(17.5px);
      font-size: rem-calc(13px);
      color: #fafafa;
    }
    .loader {
      width: rem-calc(30px);
      height: rem-calc(30px);
      transform: translateZ(0);
      animation: loaderSpinner 1.1s infinite linear;
      &.no-animate{
        animation: '';
      }
    }
    .lds-spinner {
      margin-bottom: rem-calc(34px);
    }
    .lds-spinner div {
      position: absolute;
      animation: lds-spinner linear 1s infinite;
      background: $white;
      width: rem-calc(3px);
      height: rem-calc(8px);
      border-radius: 20%;
      transform-origin: rem-calc(2px) rem-calc(16px);
    }
    .lds-spinner div:nth-child(1) {
      transform: rotate(0deg);
      animation-delay: -0.916666666666667s;
    }
    .lds-spinner div:nth-child(2) {
      transform: rotate(30deg);
      animation-delay: -0.833333333333333s;
    }
    .lds-spinner div:nth-child(3) {
      transform: rotate(60deg);
      animation-delay: -0.75s;
    }
    .lds-spinner div:nth-child(4) {
      transform: rotate(90deg);
      animation-delay: -0.666666666666667s;
    }
    .lds-spinner div:nth-child(5) {
      transform: rotate(120deg);
      animation-delay: -0.583333333333333s;
    }
    .lds-spinner div:nth-child(6) {
      transform: rotate(150deg);
      animation-delay: -0.5s;
    }
    .lds-spinner div:nth-child(7) {
      transform: rotate(180deg);
      animation-delay: -0.416666666666667s;
    }
    .lds-spinner div:nth-child(8) {
      transform: rotate(210deg);
      animation-delay: -0.333333333333333s;
    }
    .lds-spinner div:nth-child(9) {
      transform: rotate(240deg);
      animation-delay: -0.25s;
    }
    .lds-spinner div:nth-child(10) {
      transform: rotate(270deg);
      animation-delay: -0.166666666666667s;
    }
    .lds-spinner div:nth-child(11) {
      transform: rotate(300deg);
      animation-delay: -0.083333333333333s;
    }
    .lds-spinner div:nth-child(12) {
      transform: rotate(330deg);
      animation-delay: 0s;
    }
    @keyframes loaderSpinner {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    @keyframes lds-spinner {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
  }
</style>
<script>
  import { mapState } from 'vuex'
  import MaskLayer from './mask'

  const errorImg = require('@/assets/error.png')
  const resolveImg = require('@/assets/resolve.png')

  export default {
    name: 'loading',
    data() {
      return {
        errorImg,
        resolveImg,
      }
    },
    props: {
      status: {
        type: String,
        default: 'loading',
      },
    },
    components: {
      MaskLayer,
    },
    computed: {
      ...mapState('ui', ['errorText', 'resolveText']),
    },
  }
</script>
