import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import createLogger from 'vuex/dist/logger'


import ui from './modules/ui'
import activityInfo from './modules/activityInfo'
import launchLottery from './modules/launchLottery'
import luckyList from './modules/luckyList'

Vue.use(Vuex)

const actions = {}
const getters = {}
const mutations = {}
const plugins = process.env.NODE_ENV === 'production' ? [] : [createLogger()]

export default new Store({
  modules: {
    ui,
    activityInfo,
    launchLottery,
    luckyList,
  },
  actions,
  getters,
  mutations,
  plugins,
})
