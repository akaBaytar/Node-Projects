const { StatusCodes } = require('http-status-codes');

const User = require('../../models/User');
const { BadRequestError } = require('../../errors');
const {
  attachCookiesToResponse,
  generateUserToken,
} = require('../../utilities');

const updateUser = async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    throw new BadRequestError('Please provide all values.');
  }

  const {id} = req.user;
  const user = await User.findOne({ _id: id });

  user.email = email;
  user.name = name;

  await user.save();

  const userToken = generateUserToken(user);
  attachCookiesToResponse({ res, user: userToken });

  res.status(StatusCodes.OK).json({ user: userToken });
};

module.exports = updateUser;
