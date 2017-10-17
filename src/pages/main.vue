<template>
  <div class="mainContainer">
    <prize-plate
      v-if="prizeImageList"
      id="mainCanvas"
      :canvas-width="canvasWidth"
      :canvas-height="canvasHeight"
      :prize-image-list="prizeImageList"
      :remain-count="remainCount"
      :reset-pos="resetPos"
      :result="luckyIndex"
      @onend="onEnd"
      @onstart="onStart"
    >
    </prize-plate>
    <award-list v-if="isRevealWinner" :award-list="list"></award-list>
    <activity-description :description="description"></activity-description>
    <lottery-result
      :prize="luckyPrize"
      :is-lucky="isWinner"
      @onhide="onHide"
    ></lottery-result>
  </div>
</template>

<script>
  import findIndex from 'lodash/findIndex'
  import find from 'lodash/find'
  import isEmpty from 'lodash/isEmpty'
  import prizePlate from '@/components/prizePlate'
  import awardList from '@/components/awardList'
  import lotteryResult from '@/components/lotteryResult'
  import activityDescription from '@/components/activityDescription'


  import { preloadImage } from '@/utils/imageUtil'
  import essentialImgList from '@/constants/essential'

  import { mapActions, mapState, mapGetters } from 'vuex'


  export default {
    name: 'main',
    data() {
      return {
        canvasWidth: document.body.clientWidth * 2,
        canvasHeight: document.body.clientWidth * 1.63 * 2,
        prizeImageList: null,
        resetPos: false,
      }
    },
    methods: {
      ...mapActions('ui', ['setLoadingStatus']),
      ...mapActions('activityInfo', ['loadActivity']),
      ...mapActions('launchLottery', ['launchLottery']),
      ...mapActions('luckyList', ['loadLuckyList']),
      ...mapActions('wechatConfig', ['configWechat']),
      onHide() {
        this.resetPos = true
      },
      onEnd() {
        this.launchLottery({ activityId: 1, userId: '680464' })
      },
      onStart() {
        this.resetPos = false
      },
      onShare() {
        const { shareTitle, shareDetail, shareIcon } = this.activity
        const { protocol, hostname, pathname, port } = window.location
        const link = `${protocol}://${hostname}:${port}${pathname}`
        const shareConfig = {
          title: shareTitle,
          desc: shareDetail,
          imgUrl: `${protocol}://${hostname}:${port}${shareIcon}`,
          link,
          success: () => {},
          cancel: () => {},
        }
        console.log('---shareConfig', shareConfig)
        wx.ready(() => {
          wx.onMenuShareTimeline(shareConfig)
          wx.onMenuShareAppMessage(shareConfig)
        })
      },
      setConfig() {
        const { appId, timestamp, nonceStr, signature } = this.config
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId, // 必填，公众号的唯一标识
          timestamp, // 必填，生成签名的时间戳
          nonceStr, // 必填，生成签名的随机串
          signature, // 必填，签名，见附录1
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
        })
      },
    },
    components: {
      prizePlate,
      awardList,
      activityDescription,
      lotteryResult,
    },
    computed: {
      ...mapState('activityInfo', ['loading', 'error']),
      ...mapGetters('activityInfo', [
        'activity',
        'awards',
        'awardImgs',
        'remainCount',
        'isRevealWinner',
        'description',
      ]),
      ...mapGetters('launchLottery', [
        'awardId',
        'isWinner',
      ]),
      ...mapGetters('luckyList', ['list']),
      ...mapState('wechatConfig', ['config']),
      luckyPrize() {
        return find(this.awardImgs, { id: this.awardId })
      },
      luckyIndex() {
        return findIndex(this.awardImgs, { id: this.awardId })
      },
      configInfoReady() {
        console.log('----this.config', this.config)
        return !(isEmpty(this.config) || isEmpty(this.activity))
      },
    },
    created() {
      this.loadActivity({ activityId: 1, userId: '680464' })
      this.configWechat({
        url: window.location.href,
      })
    },
    watch: {
      awardImgs(newVal) {
        if (!isEmpty(newVal)) {
          this.setLoadingStatus(true)
          Promise.all([
            preloadImage(essentialImgList),
            preloadImage(newVal),
          ]).then((results) => {
            this.prizeImageList = results[1]
            this.setLoadingStatus(false)
          })
        }
      },
      isRevealWinner(val) {
        if (val === 'Y') {
          this.loadLuckyList({ activityId: 1, userId: '680464' })
        }
      },
      configInfoReady(val) {
        if (val) {
          this.setConfig()
          this.onShare()
        }
      },
    },
  }
</script>

<style lang="scss">
  @import '~theme/colors';
  @import '~theme/function';
  .mainContainer{
    flex: none;
    padding-bottom: 30px;
    background-image: url('/assets/lottery_bg.jpg');
    background-size: 100% auto;
    background-repeat: no-repeat;
    overflow: scroll;
    background-color: $yellow-23;
  }
</style>
