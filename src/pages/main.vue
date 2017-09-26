<template>
  <div class="mainContainer">
    <prize-plate
      id="mainCanvas"
      :canvas-width="canvasWidth"
      :canvas-height="canvasHeight"
      :padding-top="paddingTop"
    >
    </prize-plate>
    <div style="height: 300px;">
      ssss
    </div>
  </div>
</template>

<script>

  import prizePlate from '@/components/prizePlate'

  export default {
    name: 'main',
    data() {
      return {
        canvasWidth: document.body.clientWidth,
        canvasHeight: document.body.clientHeight,
        paddingTop: 200,
      }
    },
    methods: {},
    components: {
      prizePlate,
    },
  }
</script>

<style lang="scss">
  @import '~theme/colors';
  @import '~theme/function';
  .mainContainer{
    flex: none;
    background-image: url('/assets/bg.jpg');
    background-size: 100% auto;
    background-repeat: no-repeat;
    overflow: scroll;
  }
</style>
