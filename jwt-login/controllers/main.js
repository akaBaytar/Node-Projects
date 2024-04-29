const JWT = require('jsonwebtoken');
const APIError = require('../errors/error');

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new APIError('Email and password fields cannot be left blank', 400);
  }

  const token = JWT.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.status(200).json({ msg: 'Successfully logged in.', token });
};

const dashboard = async (req, res) => {
  let dashboardNum = Math.floor(Math.random() * 1000000).toString();
  if (dashboardNum.length < 6) dashboardNum = dashboardNum.padStart(6, '0');

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here's your authorized data: <strong>${dashboardNum}</strong>`,
  });
};

module.exports = { login, dashboard };
