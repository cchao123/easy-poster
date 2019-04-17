import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  actions: {},
  getters: {},
  modules: {
    common
  },
  state: common.state,
  mutations: common.mutations
})

export default store
