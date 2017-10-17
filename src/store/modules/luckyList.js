import map from 'lodash/map'
import {
  LOAD_LUCKY_LIST,
  LOAD_LUCKY_LIST_BEGIN,
  LOAD_LUCKY_LIST_END,
  LOAD_LUCKY_LIST_ERROR,
} from '@/store/mutation-types'
import request from '@/utils/request'

const initalState = {
  list: null,
  loading: false,
  error: null,
}

const getters = {
  list(state) {
    return map(state.list, item => ({
      name: item.loginName,
      prizeName: item.awardName,
    }))
  },
}

// actions
const actions = {
  loadLuckyList({ commit }, params) {
    commit(LOAD_LUCKY_LIST_BEGIN)
    request.loadLuckyList(params).then(response => {
      const { data: { resultFlag, errorCode, resultContent } } = response
      if (resultFlag) {
        commit(LOAD_LUCKY_LIST, resultContent)
      } else {
        commit(LOAD_LUCKY_LIST_ERROR, errorCode)
      }
    }, () => {
      commit(LOAD_LUCKY_LIST_ERROR, '服务器错误')
    }).finally(() => {
      commit(LOAD_LUCKY_LIST_END)
    })
  },
}

// mutations
const mutations = {
  [LOAD_LUCKY_LIST_BEGIN](state) {
    state.loading = true
    state.result = null
    state.error = null
  },
  [LOAD_LUCKY_LIST](state, payload) {
    state.list = payload
    state.error = null
  },
  [LOAD_LUCKY_LIST_END](state) {
    state.loading = false
  },
  [LOAD_LUCKY_LIST_ERROR](state, payload) {
    state.error = payload
  },
}

export default {
  namespaced: true,
  state: initalState,
  actions,
  getters,
  mutations,
}
