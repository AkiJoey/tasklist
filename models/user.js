const mongoose = require('../config/database')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: Number,
  username: String,
  password: String
}, { collection: 'user', versionKey: false })

module.exports = mongoose.model('User', UserSchema)