const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name field cannot be left empty.'],
    trim: true,
    minlength: [3, 'name field cannot be less than 3 characters.'],
    maxlength: [40, 'name field cannot be more than 40 characters.'],
  },

  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Task', TaskSchema);
