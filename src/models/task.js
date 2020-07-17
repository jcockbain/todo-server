const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define schema for todo items
const taskSchema = new Schema({
  title: {
    type: String,
  },
  start: {
    type: Date,
  },
  end: {
    type: Date,
  },
  completed: {
    type: Boolean,
  },
});

const Task = mongoose.model('task', taskSchema);

module.exports = Task;
