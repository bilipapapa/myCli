import moment from 'moment'

//检查键值
function check(key, value) {
  if (!key) {
    throw new Error('键值不存在')
  }
  if (typeof key !== 'string') {
    throw new Error('键值类型应为字符串')
  }
  if (value === undefined || value === null) {
    throw new Error('传入的值能为undefined或者null')
  }
}

const storage = {
  local: {
    // 设置localStorage
    set(key, value) {
      check(key, value)
      localStorage.setItem(key, JSON.stringify({ value: value, storageTime: new Date().getTime() }))
    },
    // 获取localStorage
    get(key, overdue) {
      var item = JSON.parse(localStorage.getItem(key))
      //判断是否超时  默认30分钟
      if (overdue) {
        var minutes = moment.duration(new Date().getTime() - item.storageTime).minutes()
        return minutes <= 30 ? item.value : false
      }
      return item ? item.value : null
    },
    // 删除 localStorage
    del(key) {
      localStorage.removeItem(key)
    },
    // 清空localStorage
    clear() {
      localStorage.clear()
    }
  },
  session: {
    // 设置sessionStorage
    set(key, value) {
      check(key, value)
      sessionStorage.setItem(
        key,
        JSON.stringify({ value: value, storageTime: new Date().getTime() })
      )
    },
    // 获取localStorage
    get(key, overdue) {
      var item = JSON.parse(sessionStorage.getItem(key))
      //判断是否超时  默认30分钟
      if (overdue) {
        var minutes = moment.duration(new Date().getTime() - item.storageTime).minutes()
        return minutes <= 30 ? item.value : false
      }
      return item.value
    },
    // 删除 sessionStorage
    del(key) {
      sessionStorage.removeItem(key)
    },
    // 清空sessionStorage
    clear() {
      sessionStorage.clear()
    }
  }
}

export default storage
