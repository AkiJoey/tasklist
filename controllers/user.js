const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../models/user')

const getInfo = async (ctx, next) => {
  const token = ctx.headers.authorization.substring(7)
  const username = jwt.decode(token).sub
  const data = await User.findOne({ username }, ['_id', 'username'])
	ctx.body = {
    status: 200,
    message: 'Get Sucess',
    data
  }
}

const login = async (ctx, next) => {
  const data = ctx.request.body
  const user = await User.findOne({ username: data.username })
  if (user != null && bcrypt.compareSync(data.password, user.password)) {
    const claims = {
      iss: 'akijoey',
      sub: user.username,
    }
    const secret = 'todo'
    const token = jwt.sign(claims, secret)
    ctx.body = {
      status: 200,
      message: 'Login Success',
      data: token
    }
  } else {
    ctx.body = {
      status: 401,
      message: 'Login Failure',
      data: null
    }
  }
}

module.exports = {
  getInfo,
  login
}
