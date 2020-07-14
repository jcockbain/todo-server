const server = require('../setup/server.setup');
const { expect } = require('../setup/chai.setup');

async function resetTasks() {
  const res = await server().post('/api/v1/tasks/reset');
  expect(res.status).to.equal(200);
}


async function addTask(task) {
  const res = await server()
    .post('/api/v1/tasks/')
    .send(task);
  return res;
}

async function addTaskAndGetId(task) {
  const res = await addTask(task);
  return res.body._id;
}

async function updateTask(id, taskUpdate) {
  const res = await server()
    .put(`/api/v1/tasks/${id}`)
    .send(taskUpdate);
  return res;
}

async function getTasks() {
  const res = await server()
    .get('/api/v1/tasks');
  return res;
}

async function getTask(id) {
  const res = await server()
    .get(`/api/v1/tasks/${id}`);
  return res;
}

async function deleteTask(id) {
  const res = await server()
    .delete(`/api/v1/tasks/${id}`);
  return res;
}


module.exports = {
  resetTasks,
  addTask,
  addTaskAndGetId,
  getTask,
  getTasks,
  updateTask,
  deleteTask,
};
