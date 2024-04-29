const { StatusCodes } = require('http-status-codes');
const Review = require('../../models/Review');

const getProductReviews = async (req, res) => {
  const { id } = req.params;

  const reviews = await Review.find({ product: id });

  res.status(StatusCodes.OK).json({ count: reviews.length, reviews });
};

module.exports = getProductReviews;
