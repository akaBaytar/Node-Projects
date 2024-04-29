const { StatusCodes } = require('http-status-codes');
const APIError = require('./apiError');

class ForbiddenError extends APIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = ForbiddenError;
