module.exports = {
  printWidth: 100, // 一行的字符数，如果超过会进行换行，默认为80
  tabWidth: 2, // 一个tab代表几个空格数
  useTabs: false, // 是否使用tab进行缩进，默认为false，表示用空格进行缩减
  semi: false, // 行位是否使用分号
  singleQuote: true, // 字符串是否使用单引号
  bracketSpacing: true, // 对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
  endOfLine: 'auto', // 使用 \n 或 \r\n 换行
  arrowParens: 'avoid', // 在单独的箭头函数参数周围包括括号。
  trailingComma: 'none' //多行逗号分隔的句法结构中尽可能打印尾随逗号
}
