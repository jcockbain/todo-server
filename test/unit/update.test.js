
const assert = require('assert');
const Task = require('../../src/models/task');


describe('Updating task details', () => {
  let task;

  beforeEach(async () => {
    task = new Task({ description: 'Read' });
    await task.save();
  });

  it('updates task using its instance', async () => {
    await task.updateOne({ description: 'Run' });
    const foundTask = await Task.findOne({ description: 'Run' });
    assert(foundTask != null);
  });

  it('updates task using a description', async () => {
    await Task.findOneAndUpdate({ description: 'Walk' });
    const foundTask = await Task.findOne({ description: 'Walk' });
    assert(foundTask != null);
  });
});
