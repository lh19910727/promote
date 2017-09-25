<template>
  <div id="app" class="layoutColumn">
    <loader
      v-show="isLoadingVisible"
    />
    <loader
      v-show="isReqErrorVisible"
      :status="'error'"
    />
    <loader
      v-show="isReqResolveVisible"
      :status="'resolve'"
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
import debounce from 'lodash/debounce'
import { mapGetters, mapState } from 'vuex'
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
    ...mapGetters('ui', ['isLoading']),
    ...mapState('ui', ['isReqErrorVisible', 'isReqResolveVisible']),
  },
  methods: {
    showDebouncedLoading: debounce(function a(bool) {
      this.isLoadingVisible = bool
    }, 1000),
  },
  watch: {
    isLoading(newVal) {
      this.showDebouncedLoading(newVal)
    },
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
    overflow: hidden;
  }
</style>
