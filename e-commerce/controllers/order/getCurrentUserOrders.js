const { StatusCodes } = require('http-status-codes');

const Order = require('../../models/Order');

const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(StatusCodes.OK).json({ count: orders.length, orders });
};

module.exports = getCurrentUserOrders;
