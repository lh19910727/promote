<template>
  <div class="mainContainer">
    <prize-plate
      id="mainCanvas"
      :canvas-width="canvasWidth"
      :canvas-height="canvasHeight"
    >
    </prize-plate>
    <award-list :award-list="awardListData"></award-list>
  </div>
</template>

<script>

  import prizePlate from '@/components/prizePlate'
  import awardList from '@/components/awardList'

  import awardListData from '@/constants/awardListData'

  export default {
    name: 'main',
    data() {
      return {
        canvasWidth: document.body.clientWidth,
        canvasHeight: document.body.clientWidth * 1.63,
        awardListData,
      }
    },
    methods: {},
    components: {
      prizePlate,
      awardList,
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
  }
</style>
