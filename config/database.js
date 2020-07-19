const mongoose = require('mongoose')
const chalk = require('chalk');

// connect mongodb
mongoose.connect('mongodb://localhost/todo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// chalk style
const success = chalk.bold.green;
const error = chalk.bold.red;

mongoose.connection.on('open', () => {
  console.log(success('mongo connection success'))
})
mongoose.connection.on('error', () => {
  console.log(error('mongo connection error'))
})

module.exports = mongoose
