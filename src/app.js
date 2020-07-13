require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const routes = require('./routes');
const { connectDb } = require('./models');

const port = process.env.SERVER_PORT || 3000;

const middleware = require('./middleware');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1/', routes);

app.use(middleware.errorHandler.handleErrors);

// if condition for testing
if (!module.parent) {
  connectDb().then(() => {
    app.listen(port, () => console.log(`Server listening on port ${port}!`));
  });
}

module.exports = app;
