const APIError = require('../errors');
const { isTokenValid } = require('../utilities/jwt');

const authenticateUser = async (req, _, next) => {
  let token;

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw new APIError.UnauthenticatedError('Authentication invalid.');
  }

  try {
    const payload = isTokenValid(token);

    req.user = {
      userId: payload.user.userId,
      role: payload.user.role,
    };

    next();
  } catch (error) {
    throw new APIError.UnauthenticatedError('Authentication invalid.');
  }
};

const authorizeRoles = (...roles) => {
  return (req, _, next) => {
    if (!roles.includes(req.user.role)) {
      throw new APIError.UnauthorizedError('Unauthorized to access.');
    }

    next();
  };
};

module.exports = { authenticateUser, authorizeRoles };
