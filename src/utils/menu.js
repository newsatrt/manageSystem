module.exports = [
  {
    key: 'home',
    name: '用户中心',
    icon: 'user'
  },
  {
    key: 'question-bank',
    name: '题库',
    icon: 'database',
    child: [
      {
        key: 'question-level-list',
        name: '题目管理'
      },
      {
        key: 'homework',
        name: '作业管理'
      }
    ]
  },
  {
    key: 'navigation',
    name: '报告管理',
    icon: 'area-chart'
  }
]
