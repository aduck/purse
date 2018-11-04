const execSql = require('../utils/execSql')
// 删除
let sql = `
  DROP TABLE users;
  DROP TABLE bills;
`
execSql(sql)
  .then(() => {
    console.log('清除成功')
  })
  .catch(e => {
    console.log(e.message)
  })