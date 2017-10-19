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
  const { activityId, preview } = params
  const endPoint = `activityInfo/${preview === 'true' ? 'preview' : 'info'}/${activityId}`
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

const getExtensionCode = (params) => Vue.http.post('user/genExtensionCode', params)

const recordShare = (params) => {
  const { productCode, extensionCode } = params
  return Vue.http.get(`share/product/callback/${productCode}/${extensionCode}`)
}

export default {
  loadActivityInfo,
  launchLottery,
  loadLuckyList,
  wechatConfig,
  getExtensionCode,
  recordShare,
}
