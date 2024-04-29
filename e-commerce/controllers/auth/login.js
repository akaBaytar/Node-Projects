const { StatusCodes } = require('http-status-codes');

const User = require('../../models/User');
const { BadRequestError, UnauthenticatedError } = require('../../errors');
const {
  attachCookiesToResponse,
  generateUserToken,
} = require('../../utilities');

const login = async (req, res) => {
  const { email, password } = req.body;

  // checking if the email and password fields are filled
  if (!email || !password) {
    throw new BadRequestError('Please provide valid email and password.');
  }

  // reaching the user via email
  const user = await User.findOne({ email });

  // throwing an authorization error if the user does not exist
  if (!user) {
    throw new UnauthenticatedError('Invalid email credentials.');
  }

  // comparing the hashed value of the entered password
  const isPasswordCorrect = await user.comparePassword(password);

  // throwing an authorization error if the password is incorrect
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid password credentials.');
  }

  // creating a JWT for the user
  const userToken = generateUserToken(user);

  // storing the user token as a cookie
  attachCookiesToResponse({ res, user: userToken });

  res.status(StatusCodes.OK).json({ user: userToken });
};

module.exports = login;
