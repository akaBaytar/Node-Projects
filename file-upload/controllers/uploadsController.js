const path = require('path');
const { StatusCodes } = require('http-status-codes');

const {
  BadRequestError,
  CustomAPIError,
  NotFoundError,
  UnauthenticatedError,
} = require('../errors');

const uploadProductImage = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError('No file uploaded.');
  }

  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith('image')) {
    throw new BadRequestError('Please upload a supported image.');
  }

  if (productImage.size > 1024 * 1024 * 2) {
    throw new BadRequestError('Please upload an image smaller than 2MB.');
  }

  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  );

  await productImage.mv(imagePath);

  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

module.exports = { uploadProductImage };
