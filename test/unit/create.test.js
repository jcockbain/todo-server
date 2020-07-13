// inside create_test.js
const assert = require('assert');
const Task = require('../../src/models/task');
// imports the Pokemon model.
describe('Creating Tasks', () => {
  it('creates a task', async () => {
    const task = new Task({ description: 'Walk dog', completed: true });
    await task.save(); // takes some time and returns a promise
    assert(!task.isNew); // if poke is saved to db it is not new
  });
});
