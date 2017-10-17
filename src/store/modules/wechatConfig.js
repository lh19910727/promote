import {
  WECHAT_CONFIG,
  WECHAT_CONFIG_BEGIN,
  WECHAT_CONFIG_END,
  WECHAT_CONFIG_ERROR,
} from '@/store/mutation-types'
import request from '@/utils/request'

const initalState = {
  config: null,
  loading: false,
  error: null,
}
// actions
const actions = {
  configWechat({ commit }, params) {
    commit(WECHAT_CONFIG_BEGIN)
    request.wechatConfig(params).then(response => {
      const { data: { value, success, errorCode } } = response
      if (success) {
        commit(WECHAT_CONFIG, value)
      } else {
        commit(WECHAT_CONFIG_ERROR, errorCode)
      }
    }, () => {
      commit(WECHAT_CONFIG_ERROR, '服务器错误')
    }).finally(() => {
      commit(WECHAT_CONFIG_END)
    })
  },
}

// mutations
const mutations = {
  [WECHAT_CONFIG_BEGIN](state) {
    state.loading = true
    state.config = null
    state.error = null
  },
  [WECHAT_CONFIG](state, payload) {
    state.config = payload
    state.error = null
  },
  [WECHAT_CONFIG_END](state) {
    state.loading = false
  },
  [WECHAT_CONFIG_ERROR](state, payload) {
    state.error = payload
  },
}

export default {
  namespaced: true,
  state: initalState,
  actions,
  mutations,
}
