import moment from 'moment'
import baseData from '../config/baseData'
//枚举格式化
export const enumerate = (val, enumItem) => {
  var str
  baseData[enumItem].forEach(item => {
    if (val === item.value) str = item.name
  })
  return str ? str : '--'
}
//时间格式化
export const timeFormat = (val, format) => {
  return moment(val || new Date()).format(format || 'yyyy-MM-DD HH:mm:ss')
}
export default {
  enumerate,
  timeFormat
}
