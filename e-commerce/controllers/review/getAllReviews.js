const { StatusCodes } = require('http-status-codes');
const Review = require('../../models/Review');

const getAllReviews = async (_, res) => {
  const reviews = await Review.find({})
    .populate({
      path: 'product',
      select: 'name company price rating',
    })
    .populate({
      path: 'user',
      select: 'name email',
    });

  res.status(StatusCodes.OK).json({ count: reviews.length, reviews });
};

module.exports = getAllReviews;
