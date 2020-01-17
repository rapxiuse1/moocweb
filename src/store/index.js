import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'
Vue.use(Vuex)

const store = new Vuex.Store({
  //定义状态
  state:{
    currentUser:null,//当前用户
    isLogin:false,//是否登录
  },
  getters,
  mutations,
  actions
})
export default store
