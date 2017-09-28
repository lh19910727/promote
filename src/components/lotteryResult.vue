<template>
  <div v-transfer-dom>
    <popup
      class="lotteryResult"
      v-model="visible"
      position="center"
      @on-hide="hide"
    >
      <div v-if="isLucky" class="lotteryResultContent">
        <h2>
          <span>
            恭喜您抽中<br/>
          "{{prize.title}}"
          </span>
        </h2>
        <div class="layoutColumn layoutCenterCenter prizeBox">
          <div class="prizeInnerBox">
            <img :src="prize.icon" />
            <h3>请到<a href="#">"我的奖品"</a>查看详情</h3>
          </div>
        </div>
      </div>
      <div v-if="isFail" class="lotteryResultContent fail">
        <h2>
          <span>
            很遗憾，不要气馁<br/>
            下次还有机会哦～
          </span>
        </h2>
      </div>
    </popup>
  </div>
</template>

<script>
  import isEmpty from 'lodash/isEmpty'
  import { Popup, TransferDomDirective as TransferDom } from 'vux'

  export default {
    name: 'lotteryResult',
    data() {
      return {
        visible: false,
      }
    },
    props: {
      prize: {
        type: Object,
        default() {
          return {}
        },
      },
    },
    computed: {
      isFail() {
        return this.prize && this.prize.code === 0
      },
      isLucky() {
        return this.prize && this.prize.code !== 0
      },
    },
    components: {
      Popup,
    },
    directives: {
      TransferDom,
    },
    methods: {
      hide() {
        this.$emit('onhide')
      },
    },
    watch: {
      prize(val) {
        this.visible = !isEmpty(val)
      },
    },
  }

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~theme/function";
  @import "~theme/colors";
  .lotteryResult{
    width: rem-calc(285px);
    height: rem-calc(333.5px);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: transparent;
    .lotteryResultContent{
      overflow:hidden;
      width: rem-calc(285px);
      height: rem-calc(333.5px);
      background-image: url('/assets/success.png');
      background-positon: center center;
      background-size: 100% 100%;
      padding-top: rem-calc(100px);
      &.fail{
        background-image: url('/assets/fail.png');
      }
      h2{
        height: rem-calc(100px);
        line-height: rem-calc(100px);
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        text-align: center;
        vertical-align: middle;
        span{
          display: inline-block;
          vertical-align: middle;
          line-height: 1.6;
          font-size: rem-calc(17px);
          color: $white;
        }
      }
      .prizeBox{
        height: 100%;
        background: transparent;
        .prizeInnerBox{
          display: inline-block;
          text-align: center;
          vertical-align: middle;
          h3{
            padding-top: rem-calc(40px);
            font-size: rem-calc(15px);
            line-height: 1.67;
            color: $grey-3c;
            text-align: center;
            a{
              color: $blue-f2;
            }
          }
          img{
            width: rem-calc(95px);
            height: rem-calc(96px);
          }
        }
      }
    }
  }
</style>
