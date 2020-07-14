const express = require('express');

const tasksController = require('../controllers/tasks.controller');

const router = express.Router();

router
  .route('/')
  .post(tasksController.postTask)
  .get(tasksController.getTasks);

router
  .route('/:id')
  .get(tasksController.getTask)
  .put(tasksController.putTask)
  .delete(tasksController.deleteTask);

router
  .route('/reset')
  .post(tasksController.resetTasks);

module.exports = router;
