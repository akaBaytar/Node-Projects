const mongoose = require('mongoose');

const Product = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide product name.'],
      minLength: [3, 'Product name cannot be less than 3 characters.'],
      maxLength: [100, 'Product name cannot be more than 100 characters.'],
    },

    price: {
      type: Number,
      required: [true, 'Please provide product price.'],
      default: 0,
    },

    description: {
      type: String,
      required: [true, 'Please provide product description.'],
      maxLength: [500, 'Description cannot be more than 500 characters.'],
    },

    image: {
      type: String,
      default: '/upload/default.jpeg',
    },

    category: {
      type: String,
      required: [true, 'Please provide product category.'],
      enum: [
        'office',
        'kitchen',
        'bedroom',
        'bathroom',
        'kids',
        'dining',
        'living room',
      ],
    },

    company: {
      type: String,
      required: [true, 'Please provide product company.'],
      enum: {
        values: ['ikea', 'liddy', 'marcos'],
        message: '{VALUE} is not supported.',
      },
    },

    colors: {
      type: [String],
      required: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    freeShipping: {
      type: Boolean,
      default: false,
    },

    stock: {
      type: Number,
      required: true,
      default: 1,
    },

    averageRating: {
      type: Number,
      default: 0,
    },

    reviewCount: {
      type: Number,
      default: 0,
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// listing comments associated with the product
Product.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
  justOne: false,
});

// when a product is deleted, all associated comments should also be deleted
Product.pre('deleteOne', { document: true, query: false }, async function () {
  await this.model('Review').deleteMany({ product: this._id });
});

module.exports = mongoose.model('Product', Product);
