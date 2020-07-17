
const assert = require('assert');
const Task = require('../../src/models/task');

describe('Deleting a task', () => {
  let task;

  beforeEach(async () => {
    task = new Task({ title: 'Read' });
    await task.save();
  });

  it('removes a task using its instance', async () => {
    await task.remove();
    const foundTask = await Task.findOne({ title: 'Read' });
    assert(foundTask == null);
  });

  it('removes a task using its title', async () => {
    await Task.findOneAndRemove({ title: 'Read' });
    const foundTask = await Task.findOne({ title: 'Read' });
    assert(foundTask == null);
  });

  it('removes a task using its ID', async () => {
    await Task.findByIdAndRemove(task._id);
    const foundTask = await Task.findOne({ title: 'Read' });
    assert(foundTask == null);
  });
});
