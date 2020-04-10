import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
Vue.use(Vuex)

const store = new Vuex.Store({
  //定义状态
  state,
  mutations
})
export default store

