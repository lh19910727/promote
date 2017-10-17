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
      onHide() {
        this.resetPos = true
      },
      onEnd() {
        this.launchLottery({ activityId: 1, userId: '680464' })
      },
      onStart() {
        this.resetPos = false
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
      luckyPrize() {
        return find(this.awardImgs, { id: this.awardId })
      },
      luckyIndex() {
        return findIndex(this.awardImgs, { id: this.awardId })
      },
    },
    created() {
      this.loadActivity({ activityId: 1, userId: '680464' })
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
