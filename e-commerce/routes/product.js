const express = require('express');
const router = express.Router();

// middleware for checking the user token
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

// controllers
const {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  uploadImage,
} = require('../controllers/product');

const { getProductReviews } = require('../controllers/review');

// routes
router
  .route('/')
  .post([authenticateUser, authorizePermissions('admin')], createProduct)
  .get(getAllProducts);

router
  .route('/upload-image')
  .post([authenticateUser, authorizePermissions('admin')], uploadImage);

router
  .route('/:id')
  .get(getProduct)
  .patch([authenticateUser, authorizePermissions('admin')], updateProduct)
  .delete([authenticateUser, authorizePermissions('admin')], deleteProduct);

router.route('/:id/reviews').get(getProductReviews);

module.exports = router;
