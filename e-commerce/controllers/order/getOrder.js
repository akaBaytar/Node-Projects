const { StatusCodes } = require('http-status-codes');

const { NotFoundError } = require('../../errors');
const Order = require('../../models/Order');
const { checkPermissions } = require('../../utilities');

const getOrder = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findOne({ _id: id });

  if (!order) {
    throw new NotFoundError(`No order with id:${id}.`);
  }

  checkPermissions(req.user, order.user);

  res.status(StatusCodes.OK).json({ order });
};

module.exports = getOrder;
