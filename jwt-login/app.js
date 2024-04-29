require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const Router = require('./routes/main');

const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

// middleware
app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1', Router);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () => console.log(`Server is listening on port ${port}.`));
  } catch (error) {
    console.log(error);
  }
};

start();
