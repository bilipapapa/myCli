import axios from 'axios'
import { Loading, Message } from 'element-ui' //引入Loading服务

function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r !== null) return unescape(r[2])
  return null
}
//开始加载动画
let loading

function startLoading() {
  loading = Loading.service({
    lock: true, //是否锁定
    text: '拼命加载中...', //加载中需要显示的文字
    background: 'rgba(0,0,0,.7)' //背景颜色
  })
}

//基础路径
const request = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? process.env.VUE_APP_BASE_API
      : process.env.VUE_APP_BASE_router === 'hash'
      ? ''
      : process.env.VUE_APP_BASE_API,
  timeout: 30000
})

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
//请求发起拦截
request.interceptors.request.use(
  config => {
    startLoading()
    let jsessionid = getQueryString('jsessionid')
    if (jsessionid !== null) {
      if (localStorage.getItem('JSESSIONID') !== jsessionid) {
        localStorage.setItem('JSESSIONID', jsessionid)
      }
      document.cookie = 'JSESSIONID=' + jsessionid + ';path=/'
    }
    if (config.contentType && config.method.toLowerCase() === 'post') {
      config.headers['Content-Type'] = config.contentType
    }
    config.url.includes('?')
      ? (config.url += '&jsessionid=' + getQueryString('jsessionid'))
      : (config.url += '?jsessionid=' + getQueryString('jsessionid'))
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
//请求响应拦截
request.interceptors.response.use(
  res => {
    loading.close()
    // 如果是放在架包里需要将此处放开
    if (res.config.url.includes('login-check')) {
      return res
    }
    if (res.data.code === 200) {
      return res.data
    } else {
      Message.error(res.data.msg)
    }
  },
  error => {
    //  请求出错，统一在这里处理
    if (error.response.status === 404) {
      Message.error('404 Not Found')
    } else {
      if (error.response.data.msg) {
        Message.error(error.response.data.msg)
      } else {
        Message.error('请求出错')
      }
    }
    loading.close()
    return Promise.reject(error)
  }
)
export default request
