import Vue from 'vue'
import DialogBox from './DialogBox.vue'

let dialogInstance
let DialogConstructor = Vue.extend(DialogBox)

function open(params) {
  const propsData = Object.assign({}, params)
  const parent = params.parent
  if (!parent) {
    console.warn('parent缺失！')
  }
  return new Promise((resolve, reject) => {
    dialogInstance = new DialogConstructor({
      // 传递的参数名必须为propsData才能传递过去...
      propsData
    })

    dialogInstance.vm = dialogInstance.$mount()
    dialogInstance.vm.callBackFunc = (function (resolve, reject) {
      return function (fn) {
        dialogInstance = null
        fn && fn(resolve, reject)
      }
    })(resolve, reject)

    this.$nextTick(() => {
      parent
        ? parent.$el.appendChild(dialogInstance.vm.$el) && parent.$children.push(dialogInstance)
        : document.body.appendChild(dialogInstance.vm.$el)
    })
  })
}

export default {
  install() {
    Vue.prototype.$dialogBox = open
  }
}
