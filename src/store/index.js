/*
 * @Description:
 * @Author: liumingyue
 * @Date: 2022-06-09 14:22:39
 * @LastEditTime: 2022-09-05 14:58:36
 * @LastEditors: liumingyue
 */
import Vue from 'vue'
import Vuex from 'vuex'
import menu from './modules/menu'
import user from './modules/user'

import persistData from 'vuex-persist-data'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    menu,
    user
  },
  // 持续化存储数据
  plugins: [
    persistData({
      storage: window.localStorage, // 存储方式  localStorage 或者 sessionStorage
      // timeOut: 30 * 60 * 1000, // 毫秒数
      module: ['user'] // 需配置存储的模块
    })
  ]
})
