const mongoose = require('../config/database')
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  _id: Number,
  uid: Number,
  content: String,
  status: Boolean
}, { collection: 'todo', versionKey: false })

module.exports = mongoose.model('Todo', TodoSchema)