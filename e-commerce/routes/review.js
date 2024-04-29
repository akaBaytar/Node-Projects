const express = require('express');
const router = express.Router();

// middleware for checking the user token
const { authenticateUser } = require('../middleware/authentication');

// review controllers
const {
  createReview,
  deleteReview,
  getAllReviews,
  getReview,
  updateReview,
} = require('../controllers/review');

// routes
router.route('/').post(authenticateUser, createReview);
router.route('/').get(getAllReviews);
router.route('/:id').get(getReview);
router.route('/:id').patch(authenticateUser, updateReview);
router.route('/:id').delete(authenticateUser, deleteReview);

module.exports = router;
