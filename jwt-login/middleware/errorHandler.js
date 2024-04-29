const APIError = require('../errors/error');

const errorHandlerMiddleware = (err, _, res) => {
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  return res.status(500).send('An error occurred.');
};

module.exports = errorHandlerMiddleware;
