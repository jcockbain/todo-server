// const chai = require('chai');
// const chaiHTTP = require('chai-http');
const server = require('../setup/server.setup');
const { expect } = require('../setup/chai.setup');
const mongoId = require('mongoose').Types.ObjectId();

const {
  resetTasks, addTask, getTasks, getTask, updateTask, deleteTask, addTaskAndGetId,
} = require('../modules/task.service');

const task1 = {
  description: 'Complete Homework',
  completed: false,
};

const taskUpdate = {
  description: 'cook pasta',
};

describe('/api/v1/tasks', () => {
  afterEach('delete all tasks', async () => {
    await resetTasks();
  });

  describe('POST /tasks', () => {
    it('returns 200 adding the task', async () => {
      const res = await addTask(task1);
      expect(res.status).to.equal(200);
      expect(res.body).to.include(task1);
    });
  });

  describe('GET /tasks', () => {
    it('returns 200, and the added task', async () => {
      await addTask(task1);
      const res = await getTasks();
      expect(res.status).to.equal(200);
      const taskExists = res.body.some((task) => task.description === task1.description);
      expect(taskExists).to.be.true;
    });
  });

  describe('GET /tasks/:id', () => {
    it('returns 200 and correct task', async () => {
      const id = await addTaskAndGetId(task1);
      const res = await getTask(id);
      expect(res.status).to.equal(200);
      expect(res.body).to.include(task1);
    });

    it('returns 500 for invalid id', async () => {
      const res = await getTask('id');
      expect(res.status).to.equal(500);
    });
  });

  describe('PUT /tasks/id:', () => {
    let id;

    it('returns 200 and updates a task', async () => {
      id = await addTaskAndGetId(task1);
      let res = await updateTask(id, taskUpdate);
      expect(res.status).to.equal(200);

      res = await getTask(id);
      expect(res.body).to.include(taskUpdate);
    });
    it('returns 500 for invalid id', async () => {
      const res = await updateTask('id');
      expect(res.status).to.equal(500);
    });
  });

  describe('DELETE /tasks/id', () => {
    let id;
    it("returns 404 when task doesn't exist", async () => {
      const res = await deleteTask(mongoId);
      expect(res.status).to.equal(404);
    });
    it('returns 200 when deleting existing task', async () => {
      id = await addTaskAndGetId(task1);
      const res = await deleteTask(id);
      expect(res.status).to.equal(200);
    });
    it('has removed the correct element from the taskList', async () => {
      const res = await getTasks(mongoId);
      expect(res.status).to.equal(200);
      const taskExists = res.body.some((task) => task.description === task1.description);
      expect(taskExists).to.be.false;
    });
    it('returns 404 for the deleted task', async () => {
      const res = await getTask(id);
      expect(res.status).to.equal(404);
    });
    it('returns 500 for invalid id', async () => {
      const res = await deleteTask('id');
      expect(res.status).to.equal(500);
    });
  });
});
