const { StatusCodes } = require('http-status-codes');

const User = require('../../models/User');
const { BadRequestError, UnauthenticatedError } = require('../../errors');

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  // error thrown if old or new password is not provided in the request
  if (!oldPassword || !newPassword) {
    throw new BadRequestError('Please provide valid password values.');
  }

  // finding the user whose password will be updated in the database
  const {id} = req.user;
  const user = await User.findOne({ _id: id });

  // checking the user's password
  const isPasswordCorrect = await user.comparePassword(oldPassword);

  // error thrown if the entered password to be changed is incorrect
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid password.');
  }

  // saving the new password.
  user.password = newPassword;

  // updating user information in the database.
  await user.save();

  res.status(StatusCodes.OK).json({ msg: 'Password updated successfully.' });
};

module.exports = updateUserPassword;
