<template>
  <div class="mainContainer">
  </div>
</template>

<script>
  export default {
    name: 'main',
    data() {
      return {
        isEyeOpen: true,
      }
    },
  }
</script>

<style lang="scss">
  @import '~theme/colors';
  @import '~theme/function';
  .mainContainer{
    overflow: hidden;
    background-color: $grey-e5;
    color: $black;
  }
</style>
