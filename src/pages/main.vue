<template>
  <div class="mainContainer">
    <prize-plate
      v-if="prizeImageList"
      id="mainCanvas"
      :canvas-width="canvasWidth"
      :canvas-height="canvasHeight"
      :prize-image-list="prizeImageList"
    >
    </prize-plate>
    <award-list :award-list="awardListData"></award-list>
    <activity-description :description-list="activityData"></activity-description>
  </div>
</template>

<script>
  import prizePlate from '@/components/prizePlate'
  import awardList from '@/components/awardList'
  import activityDescription from '@/components/activityDescription'

  import awardListData from '@/constants/awardListData'
  import activityData from '@/constants/activityData'

  import { preloadImage } from '@/utils/imageUtil'
  import prizeList from '@/constants/prizeData'

  export default {
    name: 'main',
    data() {
      return {
        canvasWidth: document.body.clientWidth * 2,
        canvasHeight: document.body.clientWidth * 1.63 * 2,
        awardListData,
        activityData,
        prizeImageList: null,
      }
    },
    methods: {
    },
    components: {
      prizePlate,
      awardList,
      activityDescription,
    },
    created() {
      preloadImage(prizeList).then((results) => {
        this.prizeImageList = results
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
