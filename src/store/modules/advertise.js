import map from 'lodash/map'
import pick from 'lodash/pick'

import request from '@/utils/request'
import { RECIEVE_ADVERTISE } from '@/store/mutation-types'

const initialState = {
  items: [],
}
const actions = {
  getAdvertise({ commit }, params) {
    request.queryAdvertise(params).then((response) => {
      const { data: { resultFlag, resultContent } } = response
      if (resultFlag) {
        commit(RECIEVE_ADVERTISE, map(resultContent.rows, item => pick(item, ['url', 'imgPath', 'name'])))
      }
    })
  },
}
const mutations = {
  [RECIEVE_ADVERTISE](state, payload) {
    state.items = payload
  },
}
const getters = {}

export default {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters,
}
