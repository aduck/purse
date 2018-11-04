const execSql = require('../utils/execSql')
// 不满10补0
function prefix (n) {
  return n < 10 ? `0${n}` : n
}
// 提交
exports.add = (userId, money, remark) => {
  let now = new Date()
  let batch = `${now.getFullYear()}.${prefix(now.getMonth() + 1)}`
  let opt = {
    sql: 'INSERT INTO bills (userId, money, remark, batch) VALUES (?, ?, ?, ?)',
    values: [userId, money, remark, batch]
  }
  return execSql(opt)
}
// 获取记录
exports.get = (startTime, endTime, only, userId, linkedId, limit, offset) => {
  let opt
  if (only) {
    opt = {
      sql: 'SELECT * FROM bills WHERE createAt >= ? AND createAt <= ? AND userId = ? ORDER BY id DESC LIMIT ? OFFSET ?',
      values: [startTime, endTime, userId, limit, offset]
    }
  } else {
    opt = {
      sql: 'SELECT * FROM bills WHERE createAt >= ? AND createAt <= ? AND userId IN (?) ORDER BY id DESC LIMIT ? OFFSET ?',
      values: [startTime, endTime, [userId, linkedId], limit, offset]
    }
  }
  return execSql(opt)
}
// 获取总数
exports.getCount = (startTime, endTime, only, userId, linkedId) => {
  let opt
  if (only) {
    opt = {
      sql: 'SELECT COUNT(*) AS total FROM bills WHERE createAt >= ? AND createAt <= ? AND userId = ?',
      values: [startTime, endTime, userId]
    }
  } else {
    opt = {
      sql: 'SELECT COUNT(*) AS total FROM bills WHERE createAt >= ? AND createAt <= ? AND userId IN (?)',
      values: [startTime, endTime, [userId, linkedId]]
    }
  }
  return execSql(opt)
}
// 修改
exports.update = (userId, id, money, remark) => {
  // 只能修改自己的
  let opt = {
    sql: 'UPDATE bills SET money = ?, remark = ? WHERE id = ? AND userId = ?',
    values: [money, remark, id, userId]
  }
  return execSql(opt)
}
// 获取本批次状态
exports.getStatus = userId => {
  let now = new Date()
  let batch = `${now.getFullYear()}.${prefix(now.getMonth() + 1)}`
  let opt = {
    sql: 'SELECT * FROM bills WHERE userId = ? AND batch = ?',
    values: [userId, batch]
  }
  return execSql(opt)
}