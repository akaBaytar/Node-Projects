const { StatusCodes } = require('http-status-codes');
const Product = require('../../models/Product');
const { NotFoundError } = require('../../errors');

const updateProduct = async (req, res) => {
  const { id } = req.params;
  
  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new NotFoundError(`No product with id:${id}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

module.exports = updateProduct;
