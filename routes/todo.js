const router = require('koa-router')()
const api = require('../controllers/todo')

router.prefix('/todo')

router.get('/get/:uid', api.getTodoList)
router.post('/create', api.createTodo)
router.delete('/remove/:id', api.removeTodo)
router.put('/update/:id', api.updateTodo)

module.exports = router
