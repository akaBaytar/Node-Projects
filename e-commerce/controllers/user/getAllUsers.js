const { StatusCodes } = require('http-status-codes');

const User = require('../../models/User');

const getAllUsers = async (_, res) => {
  // assigning the users variable excluding their passwords
  const users = await User.find({ role: 'user' }).select('-password');

  res.status(StatusCodes.OK).json({ users });
};

module.exports = getAllUsers;
