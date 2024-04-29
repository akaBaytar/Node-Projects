const { StatusCodes } = require('http-status-codes');

const User = require('../../models/User');
const { BadRequestError } = require('../../errors');
const {
  attachCookiesToResponse,
  generateUserToken,
} = require('../../utilities');

const register = async (req, res) => {
  // email validation
  const { email, name, password } = req.body;
  const isEmailUnavaliable = await User.findOne({ email });

  if (isEmailUnavaliable) {
    throw new BadRequestError(
      'This email has already been registered. Please enter another one.'
    );
  }

  // assigning user as admin if it's the first user
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? 'admin' : 'user';

  // adding the user to the database via mongoose
  const user = await User.create({ email, name, password, role });

  // creating a JWT for the user
  const userToken = generateUserToken(user);

  // storing the user token as a cookie
  attachCookiesToResponse({ res, user: userToken });

  res.status(StatusCodes.CREATED).json({ user: userToken });
};

module.exports = register;
