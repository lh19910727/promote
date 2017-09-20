import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import createLogger from 'vuex/dist/logger'


import products from './modules/products'
import advertise from './modules/advertise'
import ui from './modules/ui'

Vue.use(Vuex)

const actions = {}
const getters = {}
const mutations = {}
const plugins = process.env.NODE_ENV === 'production' ? [] : [createLogger()]

export default new Store({
  modules: {
    products,
    advertise,
    ui,
  },
  actions,
  getters,
  mutations,
  plugins,
})
