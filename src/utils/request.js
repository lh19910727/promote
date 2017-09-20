import Vue from 'vue'
import VueResouce from 'vue-resource'
import store from '@/store'

import {
  PENDING_REQUEST_COUNT_INCRUMENT,
  PENDING_REQUEST_COUNT_DECRUMENT,
} from '@/store/mutation-types'


Vue.use(VueResouce)
Vue.http.options = {
  root: `//${document.domain}:${window.location.port}`,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  emulateJSON: true,
  loadingUIRequired: true,
}
Vue.http.interceptors.push((request, next) => {
  const loadingUIRequired = request.loadingUIRequired;
  if (loadingUIRequired) {
    store.commit(`ui/${PENDING_REQUEST_COUNT_INCRUMENT}`)
  }
  next(() => {
    if (loadingUIRequired) {
      store.commit(`ui/${PENDING_REQUEST_COUNT_DECRUMENT}`)
    }
  })
})

const queryAdvertise = (params) => Vue.http.post('advertise/queryAdvertise', params)
const queryProducts = (params) => Vue.http.get('product/queryProduct', params)

export default {
  queryAdvertise,
  queryProducts,
}
