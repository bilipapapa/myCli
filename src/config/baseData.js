const enumerate = {
  //  菜单权限
  permission: {
    省调用户权限: [
      {
        moduleName: '停电计划预处理',
        details: [
          { path: 'powerCut', btnName: '删除' },
          { path: 'powerCut', btnName: '生成同停组' },
          { path: 'powerCut', btnName: '导出' }
        ]
      }
    ],
    地调用户权限: [
      {
        moduleName: '停电计划预处理',
        details: [{ path: 'powerCut', btnName: '更新停电计划' }]
      }
    ]
  },

  //枚举
  sex: [
    { name: '男', value: 0 },
    { name: '女', value: 1 }
  ]
}
export default enumerate
