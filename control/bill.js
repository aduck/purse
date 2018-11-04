const Bill = require('../model/bill')
// 提交
exports.submit = async ctx => {
  let body = ctx.request.body
  let user = ctx.state.user
  if (!body.money) return ctx.throw('金额不能为空')
  if (body.money < user.standard && !body.remark) return ctx.throw('不达标，来备注下吧')
  await Bill.add(user.id, body.money, body.remark)
  ctx.state.data = '提交成功'
}
// 修改
exports.edit = async ctx => {
  let body = ctx.body
  let user = ctx.state.user
  if (!body.money) return ctx.throw('金额不能为空')
  if (body.money < user.standard && !body.remark) return ctx.throw('不达标，来备注下吧')
  await Bill.update(user.id, body.id, body.money, body.remark)
  ctx.state.data = '修改成功'
}
// 获取本期状态
exports.status = async ctx => {
  let user = ctx.state.user
  let {results} = await Bill.getStatus(user.id)
  ctx.state.data = results.length
}
// 查询
exports.query = async ctx => {
  let query = ctx.request.query
  let user = ctx.state.user
  let startTime = query.startTime || '1990-01-01 00:00:00'
  let endTime = query.endTime || '2099-12-31 23:59:59'
  let limit = parseInt(query.limit) || 10
  let offset = parseInt(query.offset) || 0
  let only = query.only == 'true'
  let res = await Bill.get(startTime, endTime, only, user.id, user.linkedId, limit, offset)
  let total = await Bill.getCount(startTime, endTime, only, user.id, user.linkedId)
  ctx.state.data = {
    total: total.results[0].total,
    rows: res.results
  }
}