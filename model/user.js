const execSql = require('../utils/execSql')
const md5 = require('../utils/md5')
// 登录验证
exports.verify = (userName, password) => {
  let opt = {
    sql: 'SELECT * FROM `users` WHERE `userName` = ? AND `passWord` = ? LIMIT 1',
    values: [userName, md5(password)]
  }
  return execSql(opt)
}
// 验证用户名是否存在
exports.userNameIsValid = userName => {
  let opt = {
    sql: 'SELECT userName FROM users WHERE userName = ?',
    values: [userName]
  }
  return execSql(opt)
}
// 注册
exports.create = async (userName, passWord, email, standard) => {
  // 保存注册信息
  let saveOpt = {
    sql: 'INSERT INTO `users` (userName, passWord, email, standard) VALUES (?, ?, ?, ?)',
    values: [userName, passWord, email, standard]
  }
  return execSql(saveOpt)
}
// 编辑
exports.update = (id, email, avatar, deadLine, standard, nickName) => {
  let opt = {
    sql: `
      UPDATE users
      SET email = ?, avatar = ?, deadLine = ?, standard = ?, nickName = ?
      WHERE id = ?
    `,
    values: [email, avatar, deadLine, standard, nickName, id]
  }
  return execSql(opt)
}
// 修改linkId
exports.updateLinkId = (id, linkedId) => {
  let opt = {
    sql: 'UPDATE users SET linkedId = ? WHERE id = ?',
    values: [linkedId, id]
  }
  return execSql(opt)
}