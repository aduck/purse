/**
 * 创建users表
 */
const execSql = require('../utils/execSql')
module.exports = () => {
  let create = `
    CREATE TABLE IF NOT EXISTS bills (
      id INT NOT NULL AUTO_INCREMENT COMMENT '主键',
      userId INT NOT NULL COMMENT '用户ID',
      money INT NOT NULL COMMENT '金额*100',
      remark TEXT COMMENT '备注',
      batch VARCHAR(30) NOT NULL COMMENT '批次',
      createAt DATETIME DEFAULT NOW() COMMENT '创建时间',
      updateAt DATETIME DEFAULT NOW() ON UPDATE NOW() COMMENT '更新时间',
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `
  execSql(create)
    .then(() => {
      console.log('bills表创建成功')
    })
    .catch(e => {
      console.log(e.message)
    })
}