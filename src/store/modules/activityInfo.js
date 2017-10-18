import map from 'lodash/map'

import {
  LOAD_ACTIVITY_INFO,
  LOAD_ACTIVITY_INFO_BEGIN,
  LOAD_ACTIVITY_INFO_END,
  LOAD_ACTIVITY_INFO_ERROR,
  UPDATE_ACTIVITY_JOINTIMES,
  GET_EXTENSION_CODE,
} from '@/store/mutation-types'
import request from '@/utils/request'

const initalState = {
  activityInfo: null,
  awardList: null,
  extensionCode: null,
  loading: false,
  error: null,
}

const getters = {
  activity(state) {
    return state.activityInfo && state.activityInfo.activity
  },
  awards(state) {
    return state.activityInfo && state.activityInfo.awards
  },
  awardImgs(state, getter) {
    return map(getter.awards, award => ({
      title: award.awardName,
      icon: award.awardIcon,
      id: award.id,
    }))
  },
  remainCount(state) {
    return (state.activityInfo && state.activityInfo.joinTimes) || 0
  },
  isRevealWinner(state, getter) {
    return getter.activity && getter.activity.isRevealWinner
  },
  description(state, getter) {
    return getter.activity && getter.activity.activityDesc
  },
}

// actions
const actions = {
  loadActivity({ commit }, params) {
    commit(LOAD_ACTIVITY_INFO_BEGIN)
    request.loadActivityInfo(params).then(response => {
      const { data: { resultFlag, errorCode, resultContent } } = response
      if (resultFlag) {
        commit(LOAD_ACTIVITY_INFO, resultContent)
      } else {
        commit(LOAD_ACTIVITY_INFO_ERROR, errorCode)
      }
    }, () => {
      commit(LOAD_ACTIVITY_INFO_ERROR, '服务器错误')
    }).finally(() => {
      commit(LOAD_ACTIVITY_INFO_END)
    })
  },
  getExtensionCode({ commit }) {
    request.getExtensionCode().then(response => {
      const { data: { value } } = response
      commit(GET_EXTENSION_CODE, value)
    })
  },
}

// mutations
const mutations = {
  [LOAD_ACTIVITY_INFO_BEGIN](state) {
    state.loading = true
    state.error = null
  },
  [LOAD_ACTIVITY_INFO](state, payload) {
    state.activityInfo = payload
    state.error = null
  },
  [LOAD_ACTIVITY_INFO_END](state) {
    state.loading = false
  },
  [LOAD_ACTIVITY_INFO_ERROR](state, payload) {
    state.error = payload
  },
  [UPDATE_ACTIVITY_JOINTIMES](state, payload) {
    const { activityInfo } = state
    state.activityInfo = { ...activityInfo, joinTimes: payload }
  },
  [GET_EXTENSION_CODE](state, payload) {
    state.extensionCode = payload
  },
}

export default {
  namespaced: true,
  state: initalState,
  actions,
  getters,
  mutations,
}
