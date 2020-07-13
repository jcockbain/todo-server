// const chai = require('chai');
// const chaiHTTP = require('chai-http');
const server = require('../setup/server.setup');
const { expect } = require('../setup/chai.setup');

const task1 = {
  description: 'Complete Homework',
  completed: false,
};

const taskUpdate = {
  description: 'cook pasta',
};

async function resetTasks() {
  const res = await server().post('/api/v1/tasks/reset');
  expect(res.status).to.equal(200);
}

async function addTask(task) {
  const res = await server()
    .post('/api/v1/tasks/')
    .send(task);
  expect(res.status).to.equal(200);
  expect(res.body).to.include(task);
  return res.body._id;
}

describe('/api/v1/tasks', () => {
  afterEach('delete all tasks', async () => {
    await resetTasks();
  });

  describe('POST /tasks', () => {
    it('returns 200 adding the task', async () => {
      await addTask(task1);
    });
  });

  describe('GET /tasks', () => {
    it('returns 200, and the added task', async () => {
      await addTask(task1);
      const res = await server()
        .get('/api/v1/tasks');
      expect(res.status).to.equal(200);
      const taskExists = res.body.some((task) => task.description === task1.description);
      expect(taskExists).to.be.true;
    });
  });

  describe('GET /tasks/:id', () => {
    it('returns 200 and correct task', async () => {
      const id = await addTask(task1);
      const res = await server()
        .get(`/api/v1/tasks/${id}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.include(task1);
    });
  });

  describe('PUT /tasks/id:', () => {
    let id;
    it('returns 200 and updates a task', async () => {
      id = await addTask(task1);
      let res = await server()
        .put(`/api/v1/tasks/${id}`)
        .send(taskUpdate);
      expect(res.status).to.equal(200);

      res = await server()
        .get(`/api/v1/tasks/${id}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.include(taskUpdate);
    });
    it('has updated the tasks list correctly', async () => {

    });
  });

  describe('DELETE /tasks/id', () => {
    let id;
    it('returns 200', async () => {
      id = await addTask(task1);
      const res = await server().delete(`/api/v1/tasks/${id}`);
      expect(res.status).to.equal(200);
    });
    it('has removed the correct element from the taskList', async () => {
      const res = await server()
        .get('/api/v1/tasks');
      expect(res.status).to.equal(200);
      const taskExists = res.body.some((task) => task.description === taskUpdate.description);
      expect(taskExists).to.be.false;
    });
  });
});
