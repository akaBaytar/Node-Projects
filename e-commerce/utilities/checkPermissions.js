const { ForbiddenError } = require('../errors');

const checkPermissions = (user, id) => {
  // do not perform additional authorization checks if the user is an admin
  if (user.role === 'admin') return;
  // do not perform additional authorization checks if the user is trying to access their own information
  if (user.id === id.toString()) return;
  // throw forbidden error if the user is trying to access someone else's information
  throw new ForbiddenError('Forbidden - not authorized to access.');
};

module.exports = { checkPermissions };
