require('dotenv').config();
const connectDB = require('../database/connect');
const Product = require('../models/product');
const PRODUCTS = require('./products.json');

const populate = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(PRODUCTS);
    console.log('mock data has been uploaded to the database.');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

populate();
