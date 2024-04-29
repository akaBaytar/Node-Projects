const { StatusCodes } = require('http-status-codes');

const Review = require('../../models/Review');
const Product = require('../../models/Product');

const { NotFoundError, BadRequestError } = require('../../errors');

const createReview = async (req, res) => {
  //  product being commented on is retrieved from the request
  const { product: id } = req.body;

  // existence of the product is checked
  const isValid = await Product.findOne({ _id: id });

  // if the product doesn't exist, an error is thrown
  if (!isValid) {
    throw new NotFoundError(`No product with id: ${id}`);
  }

  // user who is making the comment is added to the request
  req.body.user = req.user.id;

  // comment is created
  const review = await Review.create(req.body);

  res.status(StatusCodes.CREATED).json({ review });
};

module.exports = createReview;
