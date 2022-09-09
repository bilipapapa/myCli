import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
import api from '@/api'
import index from '@/pages/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: index,
    redirect: '/index',
    children: []
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('@/pages/index')
  }
]

const router = new VueRouter({
  mode: process.env.VUE_APP_BASE_router_model,
  routes,
  base: process.env.VUE_APP_BASE_front_url
})

//解决cookie过期后刷新页面无法重定向至登录页
store.commit('user/setUserInfo', {})

router.beforeEach(async (to, from, next) => {
  var userInfo = store.getters['user/userInfo']
  // if (userInfo.id) {
  //   next()
  // } else {
  //   const res = await api.login({ userName: '', password: '' })
  //   if (typeof res.data.data !== 'object') {
  //     if (res.request.responseURL) {
  //       var str = res.request.responseURL

  //       str = str.match(/(\S*)8250/)[1] //公司内网
  //       window.location.href =
  //         str +
  //         '8250/redirect?redirectUrl=' +
  //         process.env.VUE_APP_BASE_front_ip +
  //         process.env.VUE_APP_BASE_front_url //公司内网
  //     }
  //   } else {
  //     store.commit('user/setUserInfo', { ...res.data.data })
  //     next()
  //   }
  // }
  next()
})
export default router
