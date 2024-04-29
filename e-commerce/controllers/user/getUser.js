const { StatusCodes } = require('http-status-codes');

const User = require('../../models/User');
const { NotFoundError } = require('../../errors');
const { checkPermissions } = require('../../utilities');

const getUser = async (req, res) => {
  // assigning the single user variable excluding his/her password
  const { id } = req.params;
  const user = await User.findOne({ _id: id }).select('-password');

  // throw a not found error if there is no user with spesific id
  if (!user) {
    throw new NotFoundError(`No user with id:${id}`);
  }

  // permissions check for accessing information
  checkPermissions(req.user, user._id);

  res.status(StatusCodes.OK).json({ user });
};

module.exports = getUser;
