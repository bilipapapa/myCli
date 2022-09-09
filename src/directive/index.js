import Vue from 'vue'
import baseData from '../config/baseData'
import store from '@/store/index'
const userInfo = store.getters['user/userInfo']
//输入框自动获取焦点
Vue.directive('focus', {
  inserted(el) {
    el.focus()
  }
})
// v-permission  按钮权限  使用方法v-permission="'path'"  path需与details里面path保持一致
Vue.directive('permission', {
  inserted(el, binding) {
    if (userInfo !== '') {
      var str = el.children[0].innerHTML.replace(/\s/g, '')
      var showBtn
      if (userInfo.moduleRole.length) {
        userInfo.moduleRole.forEach(item => {
          baseData.permission[item.roleName].forEach(_item => {
            if (_item.moduleName === item.moduleName) {
              // 判断自定义指令目标按钮 是否在权限列表中
              showBtn = _item.details.some(elem => {
                return elem.path === binding.value && str === elem.btnName
              })
            }
          })
        })
        if (!showBtn) {
          el.parentNode.removeChild(el) //  删除目标元素
        }
      }
    }
  }
})
