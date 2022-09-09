import { Loading } from 'element-ui' // 引入Loading服务

let loading
export function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
export function endLoading() {
  loading.close()
}

export function uniqueArr(arr) {
  var newArr = []
  var temp = {}
  var len = arr.length
  for (var i = 0; i < len; i++) {
    if (!temp[arr[i]]) {
      temp[arr[i]] = 'abc'
      newArr.push(arr[i])
    }
  }
  return newArr
}

export function unique(arr) { // es6 set去重
  return Array.from(new Set(arr))
}

export function getArrDifference(arr1, arr2) {
  return arr1.concat(arr2).filter(function(v, i, arr) {
    return arr.indexOf(v) === arr.lastIndexOf(v)
  })
}
export function timesday(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  return year + '-' + month + '-' + day
}

export function arrTest(arr, key) {
  var obj = {}
  for (var i = 0; i < arr.length; i++) {
    if (obj[arr[i][key]]) {
      return false
    } else {
      obj[arr[i][key]] = arr[i]
    }
    return obj
  }
}

export function timestampToTime(date) { // 获取当前时间
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  if (hour < 10) {
    hour = '0' + hour
  }
  if (minute < 10) {
    minute = '0' + minute
  }
  if (second < 10) {
    second = '0' + second
  }
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
}

export function getMonthFirstLastDay(year, month) {
  var firstDay = new Date(year, month - 1, 1) // 这个月的第一天
  var currentMonth = firstDay.getMonth() // 取得月份数
  var nextMonthFirstDay = new Date(firstDay.getFullYear(), currentMonth + 1, 1) // 加1获取下个月第一天
  var dis = nextMonthFirstDay.getTime() - 24 * 60 * 60 * 1000 // 减去一天就是这个月的最后一天
  var lastDay = new Date(dis)
  firstDay = timesday(firstDay)
  lastDay = timesday(lastDay)

  return [firstDay, lastDay]
}

export function getYearFirstLastDay(year) {
  console.log(year)
  var firstDay = new Date(year, 0, 1) // 今年的第一天
  var lastDay = new Date(year, 12, 0)
  return [firstDay, lastDay]
}

export default {
  // eslint-disable-next-line no-extend-native
  format: Date.prototype.Format = function(fmt) { // author: zxj
    var o = {
      'M+': this.getMonth() + 1, // 月份
      'd+': this.getDate(), // 日
      'h+': this.getHours(), // 小时
      'm+': this.getMinutes(), // 分
      's+': this.getSeconds(), // 秒
      'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
      'S': this.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length)) }
    for (var k in o) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
    return fmt
  }
}

export function dateFormat(fmt, date) { // 标准时间格式处理
  if (typeof date === 'string') date = new Date(date)
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1
          ? o[k]
          : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}

export function add0(m) {
  return m < 10 ? '0' + m : m
}

export function timestampToString(shijianchuo) { // 时间戳转年月日
  var time = new Date(shijianchuo)
  var y = time.getFullYear()
  var m = time.getMonth() + 1
  var d = time.getDate()
  return y + '-' + add0(m) + '-' + add0(d)
}

// 从OriValue冲查询出'${key}='后的数据
// 例： OriValue='?formId=123456&oaType=JXD&saveMode=1',key='oaType=',返回'JXD'
export function getQueryValue(OriValue, key) {
  var params = OriValue.replace('?', '').split('&')
  let res = ''
  params.forEach(item => {
    if (item.indexOf(key) != -1) {
      res = item.replace(key, '')
      console.log(res)
    }
  })
  return res
}

// ==================================== 以下为新增========================================
// 获取url参数
export function getQueryString(url, name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const r = url.substr(1).match(reg)
  if (r != null) {
    return decodeURIComponent(r[2])
  }
  return null
}
// 获取当前月份第一天
export function getCurMonthFirst() {
  var date = new Date()
  date.setDate(1)
  var month = parseInt(date.getMonth() + 1)
  var day = date.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  return date.getFullYear() + '-' + month + '-' + day
}

// 获取当前月份最后一天
export function getCurMonthLast() {
  var date = new Date()
  var currentMonth = date.getMonth()
  var nextMonth = ++currentMonth
  var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1)
  var oneDay = 1000 * 60 * 60 * 24
  var lastTime = new Date(nextMonthFirstDay - oneDay)
  var month = parseInt(lastTime.getMonth() + 1)
  var day = lastTime.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  return date.getFullYear() + '-' + month + '-' + day
}

// 导出格式化的当前月份第一天和最后一天
export const monthDate = [getCurMonthFirst(), getCurMonthLast()]

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

// 阿拉伯数字转中文汉字
export function chineseNumber(num) {
  const changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'] // changeNum[0] = "零"
  const unit = ['', '十', '百']
  num = parseInt(num)
  const getWan = (temp) => {
    const strArr = temp.toString().split('').reverse()
    let newNum = ''
    for (var i = 0; i < strArr.length; i++) {
      newNum = (i == 0 && strArr[i] == 0 ? '' : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? '' : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum
    }
    return newNum
  }
  const overWan = Math.floor(num / 100)
  let noWan = num % 100
  if (noWan.toString().length < 2) noWan = '0' + noWan
  const strr = (overWan ? getWan(overWan) + '百' + getWan(noWan) : getWan(num))
  console.log(strr)
  if (strr.split('')[0] == '一') {
    // return strr.substring(1)
    return strr.length > 1 ? strr.substring(1) : strr.substring(0)
  } else {
    return overWan ? getWan(overWan) + '百' + getWan(noWan) : getWan(num)
  }
}

// 生成可以插入到arrDatas中完成树形数据结构显示的对象
export function createRunObj(pid, info, runway) {
  const runwayObj = {
    parent: pid,
    dev: {
      description: info.name,
      ...info
    },
    children: []
  }
  runway.forEach(item => {
    const newObj = {
      parent: pid,
      dev: item,
      children: []
    }
    runwayObj.children.push(newObj)
  })

  return runwayObj
}

// 通用格式化运行方式，生成符合通讯接口的数据格式
/* 返回值:
{
  "aclinestate": [], // 线路启停
  "devicestate": [], // 设备启停
  "elementstate": [], // 设备倒排
  "indstation": []	// 220kV分列
}
*/
export function formatRunWay(runwaydata, modifyFlag) {
  const tmpindrunway = {
    aclinestate: [],
    devicestate: [],
    elementstate: []
  }

  runwaydata.forEach(item => {
    if (modifyFlag) {
      // 修改格式的
      if (item.type == 'aclinestate') {
        tmpindrunway.aclinestate.push({
          id: item.id,

          name: item.id ? undefined : item.name,
          nameuuid: item.id ? undefined : item.nameuuid,

          reservesubstation: item.reservesubstation,
          reservesubstationuuid: item.reservesubstationuuid,
          chargesubstation: item.chargesubstation,
          chargesubstationuuid: item.chargesubstationuuid,
          servicestatus: item.servicestatus
        })
      } else if (item.type == 'devicestate') {
        tmpindrunway.devicestate.push({
          id: item.id,
          name: item.id ? undefined : item.name,
          nameuuid: item.id ? undefined : item.nameuuid,
          devtype: item.devtype,
          servicestatus: item.servicestatus
        })
      } else {
        tmpindrunway.elementstate.push({
          id: item.id,
          name: item.id ? undefined : item.name,
          nameuuid: item.id ? undefined : item.nameuuid,
          devtype: item.id ? undefined : item.devtype,
          attrname: item.attrname,
          attrvalue: item.attrvalue,
          attrvaluename: item.attrvaluename,
          fromsubstationuuid: item.fromsubstationuuid,
          tosubstationuuid: item.tosubstationuuid
        })
      }
    } else {
      // 新增格式的
      if (item.type == 'aclinestate') {
        tmpindrunway.aclinestate.push({
          name: item.name,
          nameuuid: item.nameuuid,
          reservesubstation: item.reservesubstation,
          reservesubstationuuid: item.reservesubstationuuid,
          chargesubstation: item.chargesubstation,
          chargesubstationuuid: item.chargesubstationuuid,
          servicestatus: item.servicestatus,

          description: item.description
        })
      } else if (item.type == 'devicestate') {
        tmpindrunway.devicestate.push({
          name: item.name,
          nameuuid: item.nameuuid,
          devtype: item.devtype,
          servicestatus: item.servicestatus,

          description: item.description
        })
      } else {
        tmpindrunway.elementstate.push({
          name: item.name,
          nameuuid: item.nameuuid,
          attrname: item.attrname,
          attrvalue: item.attrvalue,
          attrvaluename: item.attrvaluename,
          devtype: item.devtype,
          fromsubstationuuid: item.fromsubstationuuid,
          tosubstationuuid: item.tosubstationuuid,

          description: item.description
        })
      }
    }
  })

  return tmpindrunway
}

export function download(url) {
  var a = document.createElement('a')
  a.style.display = 'none'
  a.download = ''
  a.url = url
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

/**
 * @function 220kv分列新增生成的数据结构转方式新增界面220分列tab页数据结构
 *
*/
export function stationSplitDataTrans(source) {
  const { tmplId, station, indstation } = source
  const target = {
    tmplname: '', // 分列名
    tmplId,
    indtmplbusbarlist: [], // 各侧分列母线名称
    indtmpl: {} // 分列具体信息
  }
  target.tmplname = `【${indstation.year}】${indstation.name}`
  target.indtmplbusbarlist = indstation.tmpl.indtmplbusbar.map(item => item.name)
  target.indtmpl = {
    name: indstation.name,
    type: indstation.type,
    substationuuid: indstation.tmpl.substationuuid,
    substaionName: station,
    owner: indstation.owner,
    year: indstation.year,
    indtmplbusbar: indstation.tmpl.indtmplbusbar,
    indrunway: indstation.tmpl.indrunway
  }
  return target
}

//下载文件  文件流
export function downloadBlob(res) {
  const blob = new Blob([res.data])
  // 获取文件名称
  const fileName = res.headers['content-disposition'].split(';')[1].split('filename=')[1]
  //对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
  //IE10以上支持blob，但是依然不支持download
  if ('download' in document.createElement('a')) {
    //支持a标签download的浏览器
    const link = document.createElement('a') //创建a标签
    link.download = fileName //a标签添加属性
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    document.body.appendChild(link)
    link.click() //执行下载
    URL.revokeObjectURL(link.href) //释放url
    document.body.removeChild(link) //释放标签
  } else {
    navigator.msSaveBlob(blob, fileName)
  }
}
//下载文件  文件地址
export function download(url, name) {
  const link = document.createElement('a') //创建a标签
  link.download = name //a标签添加属性
  link.style.display = 'none'
  link.href = url
  document.body.appendChild(link)
  link.click() //执行下载
  URL.revokeObjectURL(link.href) //释放url
  document.body.removeChild(link) //释放标签
}
//数组去重
export function uniqueArr(arr) {
  var newArr = []
  var temp = {}
  var len = arr.length
  for (var i = 0; i < len; i++) {
    if (!temp[arr[i]]) {
      temp[arr[i]] = true
      newArr.push(arr[i])
    }
  }
  return newArr
}

// 深拷贝
export function deepClone(obj) {
	let newObj = obj instanceof Array ? [] : {}
	for (let key in obj) {
		newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
	}
	return newObj
}