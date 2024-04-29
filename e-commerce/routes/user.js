const express = require('express');
const router = express.Router();

// middleware for checking the user token
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

// user controllers
const {
  getAllUsers,
  getUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require('../controllers/user');

// routes
router
  .route('/')
  .get([authenticateUser, authorizePermissions('admin')], getAllUsers);

router.route('/me').get(authenticateUser, showCurrentUser);

router.route('/update-user').patch(authenticateUser, updateUser);

router
  .route('/update-user-password')
  .patch(authenticateUser, updateUserPassword);

router.route('/:id').get(authenticateUser, getUser);

module.exports = router;
