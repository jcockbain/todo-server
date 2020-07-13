const repository = require('../repositories/task-repository');

const getTasks = async (req, res, next) => {
  try {
    const tasks = await repository.findAll();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

const getTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await repository.findById(id);
    res.json(task);
  } catch (err) {
    next(err);
  }
};

const postTask = async (req, res, next) => {
  try {
    const { description, date, completed } = req.body;
    const task = await repository.create(description, date, completed);
    res.json(task);
  } catch (err) {
    next(err);
  }
};

const putTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = {
      description: req.body.description,
      date: req.body.date,
      completed: req.body.completed,
    };
    await repository.updateById(id, task);
    res.json(task);
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    await repository.deleteById(id);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

const resetTasks = async (req, res, next) => {
  try {
    await repository.reset();
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};


module.exports = {
  getTasks,
  getTask,
  postTask,
  putTask,
  deleteTask,
  resetTasks,
};
