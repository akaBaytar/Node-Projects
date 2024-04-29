const { StatusCodes } = require('http-status-codes');

const Review = require('../../models/Review');
const { NotFoundError } = require('../../errors');
const { checkPermissions } = require('../../utilities');

const updateReview = async (req, res) => {
  const { id } = req.params;
  const { rating, title, comment } = req.body;

  const review = await Review.findOne({ _id: id });

  if (!review) {
    throw new NotFoundError(`No review with id: ${id}.`);
  }

  checkPermissions(req.user, review.user);

  review.rating = rating;
  review.title = title;
  review.comment = comment;

  await review.save();

  res.status(StatusCodes.OK).json({ review });
};

module.exports = updateReview;
