const express = require('express');
const router = express.Router();

// middleware for checking the user token
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

// order controllers
const {
  createOrder,
  getAllOrders,
  getCurrentUserOrders,
  getOrder,
  updateOrderStatus,
} = require('../controllers/order');

// routes
router
  .route('/')
  .post(authenticateUser, createOrder)
  .get([authenticateUser, authorizePermissions('admin')], getAllOrders);

router.route('/my-orders').get(authenticateUser, getCurrentUserOrders);

router
  .route('/:id')
  .get(authenticateUser, getOrder)
  .patch(authenticateUser, updateOrderStatus);

module.exports = router;
