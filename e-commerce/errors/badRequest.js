const { StatusCodes } = require('http-status-codes');
const APIError = require('./apiError');

class BadRequestError extends APIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
