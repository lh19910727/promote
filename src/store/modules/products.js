import filter from 'lodash/filter'
import includes from 'lodash/includes'
import request from '@/utils/request'
import {
  NETWORK_ERROR,
  DATA_ERROR,
} from '@/constants'
import {
  RECIEVE_TOP_PRODUCTS,
  RECIEVE_SPECIAL_PRODUCTS,
  SET_ERROR_MSG,
  CLEAR_ERROR_MSG,
} from '@/store/mutation-types'

const initalState = {
  topProducts: [],
  specialProducts: [],
  error: null,
}
const actions = {
  getProducts({ commit }, params) {
    request.queryProducts(params).then(response => {
      const { data: { resultFlag, resultContent: { products } } } = response
      if (resultFlag) {
        const productList = products.rows
        const topProducts = filter(productList, product => includes((product.productType || '').split(','), '1'))
        const specialProducts = filter(productList, product => includes((product.productType || '').split(','), '2'))
        commit(RECIEVE_TOP_PRODUCTS, topProducts)
        commit(RECIEVE_SPECIAL_PRODUCTS, specialProducts)
      } else {
        commit(SET_ERROR_MSG, {
          type: DATA_ERROR,
          msg: '获取数据错误',
        })
      }
    }, () => {
      commit(SET_ERROR_MSG, {
        type: NETWORK_ERROR,
        msg: '获取数据错误',
      })
    })
  },
}
const mutations = {
  [RECIEVE_TOP_PRODUCTS](state, payload) {
    state.topProducts = payload
  },
  [RECIEVE_SPECIAL_PRODUCTS](state, payload) {
    state.specialProducts = payload
  },
  [SET_ERROR_MSG](state, payload) {
    state.error = payload
  },
  [CLEAR_ERROR_MSG](state) {
    state.error = null
  },
}

const getters = {}

export default {
  namespaced: true,
  state: initalState,
  actions,
  mutations,
  getters,
}
