<template>
  <div
    class="mask"
    :style="{backgroundColor: bgcolor}"
    @click="maskClick"
  >
    <slot></slot>
  </div>
</template>
<style lang='scss'>
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 999;
  }
</style>
<script>
export default {
  props: [
    'bgcolor',
  ],
  methods: {
    maskClick() {
      this.$emit('Click')
    },
  },
}
</script>
