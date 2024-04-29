const { StatusCodes } = require('http-status-codes');
const APIError = require('./apiError');

class UnauthenticatedError extends APIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
