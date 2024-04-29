const { StatusCodes } = require('http-status-codes');

const errorHandler = (err, _, res, __) => {
  let apiError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'An error occurred.',
  };

  if (err.name === 'ValidationError') {
    apiError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',');
    apiError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.code && err.code === 11000) {
    apiError.msg = `Duplicate value for ${Object.keys(err.keyValue)} field.`;
    apiError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.name === 'CastError') {
    apiError.msg = `No item found with id:${err.value}`;
    apiError.statusCode = StatusCodes.NOT_FOUND;
  }

  return res.status(apiError.statusCode).json({ msg: apiError.msg });
};

module.exports = errorHandler;
