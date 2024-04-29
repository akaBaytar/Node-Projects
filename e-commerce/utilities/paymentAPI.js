const paymentAPI = async ({ total, currency }) => {
  const client_secret = process.env.CLIENT_SECRET;

  return { client_secret, total, currency };
};

module.exports = { paymentAPI };
