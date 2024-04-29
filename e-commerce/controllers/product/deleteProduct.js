const { StatusCodes } = require('http-status-codes');
const Product = require('../../models/Product');
const { NotFoundError } = require('../../errors');

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findOne({ _id: id });

  if (!product) {
    throw new NotFoundError(`No product with id:${id}`);
  }

  await product.deleteOne();

  res.status(StatusCodes.OK).json({ msg: 'Product successfully deleted.' });
};

module.exports = deleteProduct;
