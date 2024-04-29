const express = require('express');
const router = express.Router();

// controllers
const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasks');

// routes
router.route('/').get(getAllTasks);
router.route('/').post(createTask);
router.route('/:id').get(getTask);
router.route('/:id').patch(updateTask);
router.route('/:id').delete(deleteTask);

module.exports = router;
