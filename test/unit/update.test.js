
const assert = require('assert');
const Task = require('../../src/models/task');


describe('Updating task details', () => {
  let task;

  beforeEach(async () => {
    task = new Task({ title: 'Read' });
    await task.save();
  });

  it('updates task using its instance', async () => {
    await task.updateOne({ title: 'Run' });
    const foundTask = await Task.findOne({ title: 'Run' });
    assert(foundTask != null);
  });

  it('updates task using a title', async () => {
    await Task.findOneAndUpdate({ title: 'Walk' });
    const foundTask = await Task.findOne({ title: 'Walk' });
    assert(foundTask != null);
  });
});
