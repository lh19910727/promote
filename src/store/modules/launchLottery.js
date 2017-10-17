import {
  LAUNCH_LOTTERY,
  LAUNCH_LOTTERY_BEGIN,
  LAUNCH_LOTTERY_END,
  LAUNCH_LOTTERY_ERROR,
  UPDATE_ACTIVITY_JOINTIMES,

} from '@/store/mutation-types'
import request from '@/utils/request'

const initalState = {
  result: null,
  loading: false,
  error: null,
}

const getters = {
  awardId(state) {
    return state.result && state.result.activityResult && state.result.activityResult.awardId
  },
  isWinner(state) {
    return state.result && state.result.activityResult && state.result.activityResult.isWinner
  },
  joinTimes(state) {
    return ((state.result && state.result.joinTimes) || 0)
  },
}

// actions
const actions = {
  launchLottery({ commit }, params) {
    commit(LAUNCH_LOTTERY_BEGIN)
    request.launchLottery(params).then(response => {
      const { data: { resultFlag, errorCode, resultContent } } = response
      if (resultFlag) {
        const { joinTimes } = resultContent
        commit(LAUNCH_LOTTERY, resultContent)
        commit(`activityInfo/${UPDATE_ACTIVITY_JOINTIMES}`, joinTimes, { root: true })
      } else {
        commit(LAUNCH_LOTTERY_ERROR, errorCode)
      }
    }, () => {
      commit(LAUNCH_LOTTERY_ERROR, '服务器错误')
    }).finally(() => {
      commit(LAUNCH_LOTTERY_END)
    })
  },
}

// mutations
const mutations = {
  [LAUNCH_LOTTERY_BEGIN](state) {
    state.loading = true
    state.result = null
    state.error = null
  },
  [LAUNCH_LOTTERY](state, payload) {
    state.result = payload
    state.error = null
  },
  [LAUNCH_LOTTERY_END](state) {
    state.loading = false
  },
  [LAUNCH_LOTTERY_ERROR](state, payload) {
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
