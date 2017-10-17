<template>
  <div id="app" class="layoutColumn">
    <loader
      v-show="isGlobalLoading"
    />
    <div class="flex1 pageContent">
      <div style="width: 100%;">
        <router-view></router-view>
      </div>
    </div>
    <div class="flexNone">
      <router-view name="bottomBar"></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import loader from '@/components/common/loader'

export default {
  name: 'app',
  data() {
    return {
      isLoadingVisible: false,
    }
  },
  components: {
    loader,
  },
  computed: {
    ...mapGetters('ui', ['isGlobalLoading']),
  },
}
</script>

<style>
  @import "~theme/reset.scss";
  @import "~theme/flexLayout.scss";
  #app{
    height: 100%;
    flex: none;
    overflow: hidden;
  }
  .pageContent{
    overflow: scroll;
  }
</style>
