module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    eqeqeq: ['error', 'always'], // 要求使用 === 和 !==
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off', //生产模式不允许console.log
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off' //生产模式不允许debugger
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        mocha: true
      }
    },
    {
      files: ['src/pages/index.vue', 'src/pages/**/index.vue'], // 匹配views和二级目录中的index.vue
      rules: {
        'vue/multi-word-component-names': 'off'
      } //给上面匹配的文件指定规则
    }
  ]
}
