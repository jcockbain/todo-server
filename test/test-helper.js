const mongoose = require('mongoose');
const config = require('../src/config');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB);
mongoose.connection
  .once('open', () => console.log('Connected!'))
  .on('error', (error) => {
    console.warn('Error : ', error);
  });
// Called hooks which runs before something.
beforeEach((done) => {
  mongoose.connection.collections.tasks.drop(() => {
    done();
  });
});
