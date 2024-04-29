// environment variables
require('dotenv').config();

// async error handler
require('express-async-errors');

// init express
const express = require('express');
const app = express();

app.use(express.static('./public'));

// connect database
const connectDB = require('./database/connect');

// router
const router = require('./routes/products');

// middlewares
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

// routes
app.get('/', (_, res) => res.send("<a href='/api/v1/products'>Products</a>"));

app.use('/api/v1/products', router);

// init middlewares
app.use(notFound);
app.use(errorHandler);

// port variable and connect database
const port = process.env.PORT || 3000;

(async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening in port ${port}`));
  } catch (error) {
    console.log(error);
  }
})();
