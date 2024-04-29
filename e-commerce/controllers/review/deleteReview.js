const { StatusCodes } = require('http-status-codes');

const Review = require('../../models/Review');
const { NotFoundError } = require('../../errors');
const { checkPermissions } = require('../../utilities');

const deleteReview = async (req, res) => {
  const { id } = req.params;

  const review = await Review.findOne({ _id: id });

  if (!review) {
    throw new NotFoundError(`No review with id: ${id}.`);
  }

  checkPermissions(req.user, review.user);

  await review.deleteOne();

  res.status(StatusCodes.OK).json({ msg: 'Review successfully deleted.' });
};

module.exports = deleteReview;
