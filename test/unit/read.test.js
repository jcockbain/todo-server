
const assert = require('assert');
const Task = require('../../src/models/task');


describe('Reading task details', () => {
  it('finds task with the correct title', async () => {
    const task = new Task({ title: 'Read' });
    await task.save();
    const foundTask = await Task.findOne({ title: 'Read' });
    assert(foundTask.title === 'Read');
  });
});
