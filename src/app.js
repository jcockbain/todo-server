require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const routes = require('./routes');
const { connectDb } = require('./models');

const port = process.env.SERVER_PORT || 4000;

const middleware = require('./middleware');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1/', routes);

app.use(middleware.errorHandler.handleErrors);

connectDb().then(() => {
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});

module.exports = app;
