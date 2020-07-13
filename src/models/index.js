const mongoose = require('mongoose');
const Task = require('./task');
const config = require('../config');

const connectDb = () => mongoose.connect(config.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const models = { Task };

module.exports = { connectDb, models };
