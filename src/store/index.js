import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
// 1.安装插件
Vue.use(Vuex)

// 2.创建store对象
const store = new Vuex.Store({
  state:{
    cartList:[]
  },
  mutations,
  // mutations唯一的目的是修改state的状态，其中的每个方法尽可能完成的事件比较单一一点
  actions,
  getters

})

// 3.挂载到Vue实例上
export default store