<template>
  <div class="layoutColumn layoutCenterCenter container">
    <svg class="notFoundIcon">
      <use xlink:href="#404"></use>
    </svg>
    <h2>您访问的页面不存在</h2>
  </div>
</template>
<script>
  import '@/assets/icons/404.svg'

  export default {
    name: 'notFound',
  }
</script>
<style lang="scss" scoped>
  @import "~theme/function";
  @import "~theme/colors";
  @import "~theme/flexLayout";

  .container{
    height: 100%;
    width: 100%;
    .notFoundIcon{
      width: rem-calc(200px);
      height: rem-calc(200px);
      margin-bottom: rem-calc(10px);
      fill: $grey-99;
    }
    h2{
      font-size: rem-calc(14px);
      color: $grey-99;
    }
  }
</style>
