const JWT = require('jsonwebtoken');
const APIError = require('../errors/error');

const authMiddleware = async (req, _, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new APIError('No token provided.', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    const { username } = decoded;
    req.user = { username };
    next();
  } catch (error) {
    throw new APIError('Not authorized to access dashboard.', 401);
  }
};

module.exports = authMiddleware;
