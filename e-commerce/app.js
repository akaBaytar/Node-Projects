// imports
require('dotenv').config();
require('express-async-errors');

// express
const express = require('express');
const app = express();

// packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

// security
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

// database
const connectDB = require('./database/connect');

// routers
const auth = require('./routes/auth');
const user = require('./routes/user');
const product = require('./routes/product');
const review = require('./routes/review');
const order = require('./routes/order');

// middleware
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

app.set('trust proxy', 1);
app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 60 })); // 15 minutes - max request: 60
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(morgan('tiny')); // log http request details
app.use(express.json()); // to access the JSON data within req.body
app.use(cookieParser(process.env.JWT_SECRET)); // to access the user token (cookie)

// static
app.use(express.static('./public'));
app.use(fileUpload()); // to add an image to the server - req.files

// routes
app.get('/', (_, res) => res.send('ecommerce api'));

app.use('/api/v1/auth', auth);
app.use('/api/v1/users', user);
app.use('/api/v1/products', product);
app.use('/api/v1/reviews', review);
app.use('/api/v1/orders', order);

// error middlewares
app.use(notFound);
app.use(errorHandler);

// port
const port = process.env.PORT || 5000;

// start function
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}.`));
  } catch (error) {
    console.log(error);
  }
};

start();
