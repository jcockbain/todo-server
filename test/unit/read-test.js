
const assert = require('assert');
const Task = require('../../src/models/task');


describe('Reading task details', () => {
  it('finds task with the correct description', async () => {
    const task = new Task({ description: 'Read' });
    await task.save();
    const foundTask = await Task.findOne({ description: 'Read' });
    assert(foundTask.description === 'Read');
  });
});
