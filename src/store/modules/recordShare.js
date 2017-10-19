import {
  RECORD_SHARE,
  RECORD_SHARE_BEGIN,
  RECORD_SHARE_END,
  RECORD_SHARE_ERROR,
} from '@/store/mutation-types'
import request from '@/utils/request'

const initalState = {
  recordResult: null,
  loading: false,
  error: null,
}

const getters = {
}

// actions
const actions = {
  logShare({ commit }, params) {
    commit(RECORD_SHARE_BEGIN)
    request.recordShare(params).then(response => {
      const { data: { resultFlag, errorCode, resultContent } } = response
      if (resultFlag) {
        commit(RECORD_SHARE, resultContent)
      } else {
        commit(RECORD_SHARE_ERROR, errorCode)
      }
    }, () => {
      commit(RECORD_SHARE_ERROR, '服务器错误')
    }).finally(() => {
      commit(RECORD_SHARE_END)
    })
  },
}

// mutations
const mutations = {
  [RECORD_SHARE_BEGIN](state) {
    state.loading = true
    state.result = null
    state.error = null
  },
  [RECORD_SHARE](state, payload) {
    state.recordResult = payload
    state.error = null
  },
  [RECORD_SHARE_END](state) {
    state.loading = false
  },
  [RECORD_SHARE_ERROR](state, payload) {
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
