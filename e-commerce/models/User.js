const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name.'],
    minLength: 3,
    maxLength: 50,
  },

  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide a email.'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email.',
    },
  },

  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    minLength: 6,
  },

  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
});

// storing the password as a hash using bcrypt
UserSchema.pre('save', async function () {
  // no rehash the password if it hasn't changed - for the .save() method in the updateUser route
  if (!this.isModified('password')) return;
  // hash via bcrypt
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// verifies the correctness of the old password when the user wants to change the password
UserSchema.methods.comparePassword = async function (oldPassword) {
  const isMatching = await bcrypt.compare(oldPassword, this.password);
  return isMatching;
};

module.exports = mongoose.model('User', UserSchema);
