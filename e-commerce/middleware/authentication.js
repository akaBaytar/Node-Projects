const { UnauthenticatedError, ForbiddenError } = require('../errors');
const { isTokenValid } = require('../utilities');

// checking if the user is logged in (token cookie)
const authenticateUser = async (req, _, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new UnauthenticatedError('Authentication invalid.');
  }

  try {
    const { name, id, role } = isTokenValid({ token });
    req.user = { name, id, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid.');
  }
};

// checking if the user has admin role (for the getAllUser route)
const authorizePermissions = (...roles) => {
  return (req, _, next) => {
    const role = req.user.role;

    if (!roles.includes(role)) {
      throw new ForbiddenError('Forbidden - unauthorized to access.');
    }

    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
