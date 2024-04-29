const jwt = require('jsonwebtoken');

// creating token
const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  return token;
};

// checking the validity of the token
const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

// storing the user token as a cookie
const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user });

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1), // expires in 1 day
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  });
};

module.exports = { createJWT, isTokenValid, attachCookiesToResponse };
