const User = require('../model/user')
const md5 = require('../utils/md5')
// 注册
exports.add = async ctx => {
  let body = ctx.request.body
  let required = {
    userName: '用户名',
    passWord: '密码',
    email: '邮箱',
    standard: '标准'
  }
  for (let x in required) {
    if (!body[x]) return ctx.throw(`${required[x]}不能为空`)
  }
  // 校验用户名是否存在
  let {results} = await User.userNameIsValid(body.userName)
  if (results.length) return ctx.throw('用户名已经存在了')
  await User.create(body.userName, md5(body.passWord), body.email, body.standard)
  ctx.state.data = '注册成功'
}
// 编辑
exports.edit = async ctx => {
  let id = ctx.state.user && ctx.state.user.id
  let body = ctx.request.body
  let required = {
    email: '邮箱',
    deadLine: '日期',
    standard: '标准'
  }
  for (let x in required) {
    if (!body[x]) return ctx.throw(`${required[x]}不能为空`)
  }
  await User.update(id, body.email, body.avatar, body.deadLine, body.standard, body.nickName)
  ctx.state.data = '修改成功'
}
// 关联ID
exports.linkId = async ctx => {
  let id = ctx.state.user && ctx.state.user.id
  let body = ctx.request.body
  await User.updateLinkId(id, body.id || null)
  ctx.state.data = '成功'
}