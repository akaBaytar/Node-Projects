const {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
} = require('./createToken');

const { generateUserToken } = require('./generateUserToken');

const { checkPermissions } = require('./checkPermissions');

const { paymentAPI } = require('./paymentAPI');

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  generateUserToken,
  checkPermissions,
  paymentAPI,
};
