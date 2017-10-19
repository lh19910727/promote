import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import createLogger from 'vuex/dist/logger'


import ui from './modules/ui'
import wechatConfig from './modules/wechatConfig'
import activityInfo from './modules/activityInfo'
import launchLottery from './modules/launchLottery'
import luckyList from './modules/luckyList'
import recordShare from './modules/recordShare'

Vue.use(Vuex)

const actions = {}
const getters = {}
const mutations = {}
const plugins = process.env.NODE_ENV === 'production' ? [] : [createLogger()]

export default new Store({
  modules: {
    ui,
    wechatConfig,
    activityInfo,
    launchLottery,
    luckyList,
    recordShare,
  },
  actions,
  getters,
  mutations,
  plugins,
})
