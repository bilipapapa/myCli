// 菜单有可能为动态的   所以写在store里面
const state = {
  menuInfo: [
    { menuName: '主页', menuPath: '/index', icon: '' }
  ]
}

const getters = {
  menuInfo(state) {
    return state.menuInfo
  }
}

const mutations = {
  setMenu(state, menu) {
    state.menuInfo = menu
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
