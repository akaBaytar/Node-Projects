const { StatusCodes } = require('http-status-codes');

const Order = require('../../models/Order');

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});

  res.status(StatusCodes.OK).json({ count: orders.length, orders });
};

module.exports = getAllOrders;
