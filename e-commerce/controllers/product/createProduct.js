const { StatusCodes } = require('http-status-codes');
const Product = require('../../models/Product');

const createProduct = async (req, res) => {
  // adding the user ID to the request
  req.body.user = req.user.id;

  // creating the product with the information provided in the request
  const product = await Product.create(req.body);

  res.status(StatusCodes.CREATED).json({ product });
};

module.exports = createProduct;
