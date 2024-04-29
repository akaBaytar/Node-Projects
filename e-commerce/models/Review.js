const mongoose = require('mongoose');

const { APIError } = require('../errors');

const Review = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 10,
      required: [true, 'Please provide rating.'],
    },

    title: {
      type: String,
      trim: true,
      required: [true, 'Please provide review title.'],
      maxLegnt: [100, 'Review title cannot be more than 100 characters.'],
    },

    comment: {
      type: String,
      required: [true, 'Please provide review text.'],
      maxLegnt: [500, 'Review title cannot be more than 500 characters.'],
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },

    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  { timestamps: true }
);

// users can only leave one comment per product
Review.index({ product: 1, user: 1 }, { unique: true });

// calculating the average rating for a product
Review.statics.calculateAverageRating = async function (pid) {
  const result = await this.aggregate([
    { $match: { product: pid } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        reviewCount: { $sum: 1 },
      },
    },
  ]);

  try {
    await this.model('Product').findOneAndUpdate(
      { _id: pid },
      {
        averageRating: result[0]?.averageRating?.toFixed(1) || 0,
        reviewCount: result[0]?.reviewCount || 0,
      }
    );
  } catch (error) {
    throw new APIError('An error occurred.');
  }
};

// recalculating the average rating after a review is created or updated
Review.post('save', async function () {
  await this.constructor.calculateAverageRating(this.product);
});

// recalculating the average  rating after a review is deleted
Review.post('deleteOne', { document: true, query: false }, async function () {
  await this.constructor.calculateAverageRating(this.product);
});

module.exports = mongoose.model('Review', Review);
