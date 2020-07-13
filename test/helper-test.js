const mongoose = require('mongoose');
const config = require('../src/config');

mongoose.Promise = global.Promise;

mongoose.connect(config.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection
  .once('open', () => {})
  .on('error', (error) => {
    console.warn('Error : ', error);
  });

afterEach(async () => {
  await mongoose.connection.collections.tasks.drop(() => {});
});
