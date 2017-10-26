<template>
  <div class="mainContainer" :style="bgStyle">
    <div v-if="hasError" class="error-box">
      对不起，{{error}}
    </div>
    <div v-if="!hasError">
      <prize-plate
        v-if="prizeImageList"
        id="mainCanvas"
        :canvas-width="canvasWidth"
        :canvas-height="canvasHeight"
        :prize-image-list="prizeImageList"
        :remain-count="remainCount"
        :reset-pos="resetPos"
        :result="luckyIndex"
        @onstart="onStart"
        @onend = "onEnd"
      >
      </prize-plate>
      <award-list v-if="isRevealWinner" :award-list="list"></award-list>
      <activity-description :description="description"></activity-description>
      <lottery-result
        :visible="visible"
        :prize="luckyPrize"
        :is-lucky="isWinner"
        @onhide="onHide"
      ></lottery-result>
    </div>
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
  import cookie from 'js-cookie'

  const USER_COOKIE_ID = 'ZATECH1000100'


  export default {
    name: 'main',
    data() {
      return {
        canvasWidth: document.body.clientWidth * 2,
        canvasHeight: document.body.clientWidth * 1.63 * 2,
        prizeImageList: null,
        resetPos: true,
        visible: false,
        tik: null,
      }
    },
    methods: {
      ...mapActions('ui', ['setLoadingStatus']),
      ...mapActions('activityInfo', ['loadActivity', 'getExtensionCode']),
      ...mapActions('launchLottery', ['launchLottery']),
      ...mapActions('luckyList', ['loadLuckyList']),
      ...mapActions('wechatConfig', ['configWechat']),
      ...mapActions('recordShare', ['logShare']),
      onHide() {
        this.resetPos = true
        this.visible = false
      },
      getCurrentPageUrl() {
        const { protocol, hostname, pathname } = window.location
        return `${protocol}//${hostname}${pathname}`
      },
      onStart() {
        if (this.resetPos) {
          this.launchLottery(this.params)
          this.resetPos = false
        }
      },
      onEnd() {
        this.tik = setTimeout(() => {
          this.visible = true
          clearTimeout(this.tick)
          this.tick = null
        }, 500)
      },
      onShare() {
        const { shareTitle, shareDetail, shareIcon } = this.activity
        const { protocol, hostname } = window.location
        const { productCode } = this.params
        const link = `${protocol}//${document.domain}/share/product.html?etc=${this.extensionCode}&pcode=${productCode}`
        const shareConfig = {
          title: shareTitle,
          desc: shareDetail,
          imgUrl: `${protocol}//${hostname}${shareIcon}`,
          link,
          success: () => {
            const logShareParmas = {
              ...this.params,
              extensionCode: this.extensionCode,
            }
            this.logShare(logShareParmas)
            setTimeout(() => {
              window.location.href = window.location.href
            }, 1000)
          },
          cancel: () => {},
        }
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
      initialParams() {
        const {
          params: { id },
          query: { extensionCode, preview, shareUrl, productCode },
        } = this.$route
        const paramObj = {
          activityId: id,
          extensionCode,
          shareUrl,
          productCode,
        }
        if (preview === 'true') {
          paramObj.preview = 'true'
        }
        this.params = paramObj
      },
      isPreviewMode() {
        return this.$route.query.preview === 'true'
      },
      isLogged() {
        return !!cookie.get(USER_COOKIE_ID)
      },
      init() {
        if (this.isLogged()) {
          this.getExtensionCode()
        }
        this.loadActivity(this.params)
        if (!this.isPreviewMode()) {
          this.configWechat({
            url: window.location.href,
          })
        }
      },
    },
    components: {
      prizePlate,
      awardList,
      activityDescription,
      lotteryResult,
    },
    computed: {
      ...mapState('activityInfo', ['loading', 'error', 'extensionCode']),
      ...mapState('recordShare', ['recordResult']),
      ...mapGetters('activityInfo', [
        'activity',
        'awards',
        'awardImgs',
        'remainCount',
        'isRevealWinner',
        'description',
        'bgImage',
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
        return !(isEmpty(this.config) || isEmpty(this.activity))
      },
      bgStyle() {
        if (!isEmpty(this.bgImage.icon)) {
          return { backgroundImage: `url(${this.bgImage.icon})` }
        }
        return { backgroundColor: '#ffffff' }
      },
      hasError() {
        return !isEmpty(this.error)
      },
    },
    created() {
      if (!this.isLogged() && !this.isPreviewMode()) {
        window.location.href = '/'
      }
      this.initialParams()
      this.init()
    },
    watch: {
      awardImgs(newVal) {
        if (!isEmpty(newVal)) {
          this.setLoadingStatus(true)
          Promise.all([
            preloadImage(essentialImgList.concat([this.bgImage])),
            preloadImage(newVal),
          ]).then((results) => {
            this.prizeImageList = results[1]
            this.setLoadingStatus(false)
          })
        }
      },
      isRevealWinner(val) {
        if (this.isPreviewMode()) return
        if (val === true) {
          this.loadLuckyList(this.params)
        }
      },
      configInfoReady(newVal) {
        if (this.isPreviewMode()) return
        if (newVal) {
          this.setConfig()
          this.onShare()
        }
      },
      isWinner(newVal) {
        if (newVal === 'Y' && this.isRevealWinner === true) {
          this.loadLuckyList(this.params)
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
    background-size: 100% auto;
    background-repeat: no-repeat;
    overflow-y: auto;
    background-color: $yellow-23;
    .error-box{
      padding: rem-calc(20px);
      text-align: center;
      font-size: rem-calc(14px);
      line-height: 1.7;
    }
  }
</style>
