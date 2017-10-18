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
  const { activityId, userId, preview } = params
  const endPoint = preview === 'true' ? `activityInfo/preview/${activityId}` : `activityInfo/info/${activityId}/${userId}`
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
const wechatConfig = (params) => Vue.http.post('wechat/config', params, { emulateJSON: true })

export default {
  loadActivityInfo,
  launchLottery,
  loadLuckyList,
  wechatConfig,
}
