import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
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
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/pages/404')
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
  next()
})
export default router
