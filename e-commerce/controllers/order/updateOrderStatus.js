const { StatusCodes } = require('http-status-codes');

const { NotFoundError } = require('../../errors');
const Order = require('../../models/Order');
const { checkPermissions } = require('../../utilities');

const updateOrderStatus = async (req, res) => {
  const { id } = req.params;

  const { paymentIntentId } = req.body;

  if (!paymentIntentId) {
    throw new NotFoundError('An error occurred. Please provide payment ID.');
  }

  const order = await Order.findOne({ _id: id });

  if (!order) {
    throw new NotFoundError(`No order with id:${id}.`);
  }

  checkPermissions(req.user, order.user);

  order.paymentIntentId = paymentIntentId;
  order.status = 'paid';

  await order.save();

  res.status(StatusCodes.OK).json({ order });
};

module.exports = updateOrderStatus;
