const router = require('koa-router')()
const api = require('../controllers/user')

router.prefix('/user')

router.get('/info', api.getInfo)
router.post('/login', api.login)

module.exports = router
