const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name must be provided.'],
  },

  price: {
    type: Number,
    required: [true, 'Price must be provided.'],
  },

  featured: {
    type: Boolean,
    default: false,
  },

  rating: {
    type: Number,
    default: 5,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  company: {
    type: String,
    enum: {
      values: ['ikea', 'liddy', 'caressa', 'marcos'],
      message: '{VALUE} is not supported as a company.',
    },
  },
});

module.exports = mongoose.model('Product', schema);
