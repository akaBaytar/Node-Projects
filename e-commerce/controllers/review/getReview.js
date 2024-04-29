const { StatusCodes } = require('http-status-codes');

const Review = require('../../models/Review');
const { NotFoundError } = require('../../errors');

const getReview = async (req, res) => {
  const { id } = req.params;

  const review = await Review.findOne({ _id: id });

  if (!review) {
    throw new NotFoundError(`No review with id: ${id}.`);
  }

  res.status(StatusCodes.OK).json({ review });
};

module.exports = getReview;
