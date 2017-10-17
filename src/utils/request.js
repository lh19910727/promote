import Vue from 'vue'
import VueResouce from 'vue-resource'

Vue.use(VueResouce)
Vue.http.options = {
  root: `//${document.domain}:${window.location.port}`,
  headers: {
    'Content-Type': 'application/json',
  },
  loadingUIRequired: true,
}

const loadActivityInfo = (params) => {
  const { activityId, userId } = params
  const endPoint = `activityInfo/info/${activityId}/${userId}`
  return Vue.http.get(endPoint)
}

const launchLottery = (params) => {
  const endPoint = 'activityInfo/prizeDraw'
  return Vue.http.post(endPoint, params, { headers: { 'Content-Type': 'application/json' } })
}

const loadLuckyList = (params) => {
  const { activityId } = params
  const endPoint = `activityResult/listWinnerByActivity/${activityId}`
  return Vue.http.get(endPoint, params)
}

export default {
  loadActivityInfo,
  launchLottery,
  loadLuckyList,
}
