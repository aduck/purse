/**
 * 创建users表
 */
const execSql = require('../utils/execSql')
module.exports = () => {
  let create = `
    CREATE TABLE IF NOT EXISTS users (
      id INT NOT NULL AUTO_INCREMENT COMMENT '主键',
      userName VARCHAR(40) NOT NULL COMMENT '用户名',
      passWord VARCHAR(50) COMMENT 'md5密码',
      email VARCHAR(30) COMMENT '邮箱',
      avatar VARCHAR(100) COMMENT '头像',
      deadLine TINYINT NOT NULL DEFAULT 10 COMMENT '截止日',
      standard INT NOT NULL COMMENT '最低标准',
      nickName VARCHAR(20) COMMENT '昵称',
      linkedId INT COMMENT '关联账户',
      createAt DATETIME DEFAULT NOW() COMMENT '创建时间',
      updateAt DATETIME DEFAULT NOW() ON UPDATE NOW() COMMENT '更新时间',
      openId VARCHAR(50) COMMENT '微信openid',
      PRIMARY KEY (id)
    ) ENGINE=InnoDB AUTO_INCREMENT=10000 DEFAULT CHARSET=utf8mb4
  `
  execSql(create)
    .then(() => {
      console.log('users表创建成功')
    })
    .catch(e => {
      console.log(e.message)
    })
}