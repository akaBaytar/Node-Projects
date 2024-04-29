const APIError = require('./apiError');
const UnauthenticatedError = require('./unauthenticated');
const NotFoundError = require('./notFound');
const BadRequestError = require('./badRequest');
const ForbiddenError = require('./forbidden');

module.exports = {
  APIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
  ForbiddenError,
};
