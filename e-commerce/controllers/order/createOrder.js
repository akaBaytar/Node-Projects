const { StatusCodes } = require('http-status-codes');

const { BadRequestError, NotFoundError } = require('../../errors');
const { paymentAPI } = require('../../utilities');

const Order = require('../../models/Order');
const Product = require('../../models/Product');

const createOrder = async (req, res) => {
  //  items, tax and shipping fee are obtained from the request (frontend)
  const { items, tax, shippingFee } = req.body;

  // if  there is no 'items' data or if it's an empty array, an error should be thrown
  if (!items || items.length < 1) {
    throw new BadRequestError('The cart is empty.');
  }

  // if there is no tax or shipping fee data, an error should be thrown
  if (!tax || !shippingFee) {
    throw new BadRequestError('Tax and shipping fee could not be calculated.');
  }

  // variables
  let orderItems = [];
  let subtotal = 0;

  // for...of loop for asynchronous data flow
  for (const item of items) {
    // assigning the product from the database by comparing it with the item id from the frontend
    const product = await Product.findOne({ _id: item.product });

    // throwing an error if such a product does not exist
    if (!product) {
      throw new NotFoundError(`No product with id: ${item.product}.`);
    }

    // retrieving necessary information from the database for the product and assigning it to a variable
    const { name, price, image, _id } = product;

    const orderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    };

    // adding products to the order
    orderItems = [...orderItems, orderItem];

    // calculating the subtotal
    subtotal += item.amount * price;
  }

  // calculating the total
  const total = tax + shippingFee + subtotal;

  // retrieving the client secret (from the utilities function serving as a fake payment api)
  const paymentIntent = await paymentAPI({
    total,
    currency: 'usd',
  });

  // creating the order in the database
  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user.id,
  });

  res.status(StatusCodes.CREATED).json({ order });
};

module.exports = createOrder;
