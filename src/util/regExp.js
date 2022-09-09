//正则 校验
const regExp = {
  base: {
    // 非零的正整数
    number: /^[1-9]\d*$/,
    //   有1~4位小数的正实数：
    floatNumber: /^([0-9]+)?(.[0-9]{1,2})?$/,
    //0到1之间的小数，
    limit: /^(0?(.\d{1,10})?)$/
  },
  check(type, value) {
    if (!type) return false
    return this.base[type].test(value)
  }
}

export default regExp
