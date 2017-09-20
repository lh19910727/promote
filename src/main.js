import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import Vtap from 'v-tap'
import { sync } from 'vuex-router-sync'

import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueLazyload)
Vue.use(Vtap)

sync(store, router)

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    next({ name: 'notFound' })
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});
