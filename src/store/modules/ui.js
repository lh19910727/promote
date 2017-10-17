import { UPDATE_GLOBAL_LOADING } from '@/store/mutation-types'

const initalState = {
  isLoading: false,
}

const getters = {
  isGlobalLoading(state, getter, rootState) {
    return state.isLoading || rootState.activityInfo.loading
  },
}

// actions
const actions = {
  setLoadingStatus({ commit }, params) {
    commit(UPDATE_GLOBAL_LOADING, params)
  },
}

// mutations
const mutations = {
  [UPDATE_GLOBAL_LOADING](state, payload) {
    state.isLoading = payload
  },
}

export default {
  namespaced: true,
  state: initalState,
  actions,
  getters,
  mutations,
}
