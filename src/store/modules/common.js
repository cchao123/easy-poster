import * as types from '../mutation-types'
import { COLLAPSE_STATUS } from '../../common/const'

const state = {
  navCollapse: COLLAPSE_STATUS.unfold
}

const mutations = {
  [types.COM_NAV_COLLAPSE] (state, data) {
    state.navCollapse = data
  }
}

export default {
  state,
  mutations
}
