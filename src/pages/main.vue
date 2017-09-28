<template>
  <div class="mainContainer">
    <prize-plate
      v-if="prizeImageList"
      id="mainCanvas"
      :canvas-width="canvasWidth"
      :canvas-height="canvasHeight"
      :prize-image-list="prizeImageList"
      :remain-count="remainCount"
      :need-reset="needReset"
      @onend="onEnd"
      @onstart="onStart"
    >
    </prize-plate>
    <award-list :award-list="awardListData"></award-list>
    <activity-description :description-list="activityData"></activity-description>
    <lottery-result
      :prize="luckyPrize"
      @onhide="onHide"
    ></lottery-result>
  </div>
</template>

<script>
  import prizePlate from '@/components/prizePlate'
  import awardList from '@/components/awardList'
  import lotteryResult from '@/components/lotteryResult'
  import activityDescription from '@/components/activityDescription'

  import awardListData from '@/constants/awardListData'
  import activityData from '@/constants/activityData'

  import { preloadImage } from '@/utils/imageUtil'
  import prizeList from '@/constants/prizeData'
  import essentialImgList from '@/constants/essential'


  export default {
    name: 'main',
    data() {
      return {
        canvasWidth: document.body.clientWidth * 2,
        canvasHeight: document.body.clientWidth * 1.63 * 2,
        awardListData,
        activityData,
        prizeImageList: null,
        luckyPrize: null,
        remainCount: 3,
        needReset: false,
      }
    },
    methods: {
      onHide() {
        this.luckyPrize = null
        this.needReset = true
      },
      onEnd(luckyIndex) {
        this.luckyPrize = prizeList[luckyIndex]
        if (this.remainCount > 0) {
          this.remainCount = this.remainCount - 1
        }
      },
      onStart() {
        this.needReset = false
      },
    },
    components: {
      prizePlate,
      awardList,
      activityDescription,
      lotteryResult,
    },
    computed: {
    },
    created() {
      Promise.all([
        preloadImage(essentialImgList),
        preloadImage(prizeList.slice(0, 6)),
      ]).then((results) => {
        this.prizeImageList = results[1]
      })
    },
  }
</script>

<style lang="scss">
  @import '~theme/colors';
  @import '~theme/function';
  .mainContainer{
    flex: none;
    padding-bottom: 30px;
    background-image: url('/assets/bg.jpg');
    background-size: 100% auto;
    background-repeat: no-repeat;
    overflow: scroll;
    background-color: $yellow-52;
  }
</style>
