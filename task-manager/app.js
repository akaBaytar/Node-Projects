const express = require('express');

const app = express();
const tasks = require('./routes/tasks');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

const connectDatabase = require('./database/connect');
require('dotenv').config();

// middleware
app.use(express.static('./public'));
app.use(express.json());

// routes
app.use('/api/v1/tasks', tasks);

// 404 not found
app.use(notFound);

// error handling
app.use(errorHandler);

const port = process.env.PORT || 3000;

// execute localhost:3000
const start = async () => {
  try {
    await connectDatabase(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
