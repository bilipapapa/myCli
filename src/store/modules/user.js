// 菜单有可能为动态的   所以写在store里面
const state = {
  userInfo: {}
}

const getters = {
  userInfo(state) {
    return state.userInfo
  }
}

const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
