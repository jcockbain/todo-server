const { endOfDay, startOfDay } = require('date-fns');
const task = require('../models/task');

class TaskRepository {
  constructor(model) {
    this.model = model;
  }

  // create a new task
  create(description, date, completed) {
    const newTask = { description, date, completed };
    const taskToSave = new this.model(newTask);
    return taskToSave.save();
  }

  findAll() {
    return this.model.find();
  }

  findById(id) {
    return this.model.findById(id);
  }

  deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }

  reset() {
    return this.model.deleteMany({});
  }

  getByDateRange(start, end) {
    const startDate = Date.parse(start);
    const endDate = Date.parse(end);
    return this.model.find({ date: { $gte: startOfDay(startDate), $lt: endOfDay(endDate) } });
  }

  updateById(id, object) {
    const query = { _id: id };
    return this.model.findOneAndUpdate(query, {
      $set: {
        description: object.description,
        date: object.date,
        completed: object.completed,
      },
    });
  }
}

module.exports = new TaskRepository(task);
