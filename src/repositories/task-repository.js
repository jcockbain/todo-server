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
