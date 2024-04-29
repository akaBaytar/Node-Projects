const { StatusCodes } = require('http-status-codes');
const APIError = require('./apiError');

class NotFoundError extends APIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
