const { StatusCodes } = require('http-status-codes');
const Product = require('../../models/Product');
const { NotFoundError } = require('../../errors');

const getProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findOne({ _id: id }).populate('reviews');

  if (!product) {
    throw new NotFoundError(`No product with id:${id}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

module.exports = getProduct;
