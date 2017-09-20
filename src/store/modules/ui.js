import debounce from 'lodash/debounce'
import * as types from '@/store/mutation-types'


const TOAST_DELAY_TIME = 2000
const DEBOUNCE_TIME = 500

const initalState = {
  pendingRequestCount: 0,
  isReqErrorVisible: false,
  isReqResolveVisible: false,
  errorText: '网络异常',
  resolveText: '请求成功',
}

const getters = {
  isLoading(state) {
    return state.pendingRequestCount > 0
  },
}

// actions
const actions = {
  showErrorToast: debounce(({ commit }, errorText) => {
    commit(types.NETWORK_ERROR_HANDLE, { bool: true, errorText })
    return new Promise(resolve => {
      setTimeout(() => {
        commit(types.NETWORK_ERROR_HANDLE, { bool: false })
        resolve()
      }, TOAST_DELAY_TIME)
    })
  }, DEBOUNCE_TIME),
  showResolveToast: debounce(({ commit }, resolveText) => {
    commit(types.NETWORK_RESOLVE_HANDLE, { bool: true, resolveText })
    return new Promise(resolve => {
      setTimeout(() => {
        commit(types.NETWORK_RESOLVE_HANDLE, { bool: false })
        resolve()
      }, TOAST_DELAY_TIME)
    })
  }, DEBOUNCE_TIME),
}

// mutations
const mutations = {
  [types.PENDING_REQUEST_COUNT_INCRUMENT](state) {
    state.pendingRequestCount += 1
  },
  [types.PENDING_REQUEST_COUNT_DECRUMENT](state) {
    if (state.pendingRequestCount > 0) {
      state.pendingRequestCount -= 1
    }
  },
  [types.NETWORK_ERROR_HANDLE](state, { bool, errorText }) {
    state.isReqErrorVisible = bool || false
    state.errorText = errorText || '网络错误'
  },
  [types.NETWORK_RESOLVE_HANDLE](state, { bool, resolveText }) {
    state.isReqResolveVisible = bool || false
    state.resolveText = resolveText || '请求成功'
  },
}

export default {
  namespaced: true,
  state: initalState,
  actions,
  getters,
  mutations,
}
