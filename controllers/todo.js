const Todo = require('../models/todo')

const getTodoList = async (ctx, next) => {
  const uid = ctx.params.uid
  const data = await Todo.find({ uid })
	ctx.body = {
    status: 200,
    message: 'Get Sucess',
    data
  }
}

const createTodo = async (ctx, next) => {
  const { uid, content } = ctx.request.body
  const max = await Todo.find().sort({ _id: -1 }).limit(1)
  const data = await Todo.create({
    _id: max[0]._id + 1,
    uid,
    content,
    status: false
  })
	ctx.body = {
    status: 200,
    message: 'Create Sucess',
    data
  }
}

const removeTodo = async (ctx, next) => {
  const _id = ctx.params.id
  const data = await Todo.deleteOne({ _id })
	ctx.body = {
    status: 200,
    message: 'Remove Sucess',
    data
  }
}

const updateTodo = async (ctx, next) => {
  const _id = ctx.params.id
  const todo = await Todo.findOne({ _id })
  const status = todo.status ? false : true
  const data = await Todo.update({ _id }, { status })
	ctx.body = {
    status: 200,
    message: 'Update Sucess',
    data
  }
}

module.exports = {
  getTodoList,
  createTodo,
  removeTodo,
  updateTodo
}
