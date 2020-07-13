const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define schema for todo items
const taskSchema = new Schema({
  description: {
    type: String,
  },
  date: {
    type: Date,
  },
  completed: {
    type: Boolean,
  },
});

const Task = mongoose.model('task', taskSchema);

module.exports = Task;
