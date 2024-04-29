const { StatusCodes } = require('http-status-codes');
const Product = require('../../models/Product');

const getAllProducts = async (_, res) => {
  const products = await Product.find({});

  res.status(StatusCodes.OK).json({ count: products.length, products });
};

module.exports = getAllProducts;
