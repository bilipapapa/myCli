import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Bus from './util/bus'
import ElementUi from 'element-ui'
import './assets/css/element-variables.scss' // 单独引入样式重置文件是防止更改common或其他文件编译时间过长
import './assets/css/main.scss'
import dialogBox from './components/dialogBox/index'

import filters from './filters/index.js'
//过滤器统一处理加载
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

//全局注册中央事件线
Vue.prototype.$bus = Bus

Vue.config.productionTip = false

Vue.use(ElementUi, {})
Vue.use(dialogBox)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
