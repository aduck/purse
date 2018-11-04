const Router = require('koa-router')
const router = new Router()
const authCheck = require('../middle/auth')
const formDataParser = require('../middle/formDataParser')
// controls
const auth = require('../control/auth')
const upload = require('../control/upload')
const user = require('../control/user')
const bill = require('../control/bill')
// routes
router.post('/login', auth.login)
router.post('/register', user.add)
router.post('/refresh', auth.refresh)
router.post('/upload', formDataParser, upload)
router
  .use('/user', authCheck)
  .post('/user/edit', user.edit)
  .post('/user/link', user.linkId)
router
  .use('/bill', authCheck)
  .post('/bill/submit', bill.submit)
  .post('/bill/edit', bill.edit)
  .get('/bill/status', bill.status)
  .get('/bill/query', bill.query)
module.exports = router