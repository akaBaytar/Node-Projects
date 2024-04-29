const { StatusCodes } = require('http-status-codes');

const logout = async (_, res) => {
  // deleting the user token stored as a cookie
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: 'User logged out.' });
};

module.exports = logout;
