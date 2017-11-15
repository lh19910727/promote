import Vue from 'vue'
import VueResouce from 'vue-resource'

Vue.use(VueResouce)
Vue.http.options = {
  root: `//${document.domain}:${window.location.port}`,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
  loadingUIRequired: true,
}

Vue.http.interceptors.push((request, next) => {
  request.url += (request.url.indexOf('?') > 0 ? '&' : '?') + `cb=${new Date().getTime()}` //eslint-disable-line
  next()
})

const loadActivityInfo = (params) => {
  const { activityId, preview } = params
  const endPoint = `activityInfo/${preview === 'true' ? 'preview' : 'info'}/${activityId}`
  return Vue.http.get(endPoint)
}

const launchLottery = (params) => {
  const { activityId } = params
  const endPoint = `activityInfo/prizeDraw/${activityId}`
  return Vue.http.get(endPoint)
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
