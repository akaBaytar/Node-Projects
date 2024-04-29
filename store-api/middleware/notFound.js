const notFound = (_, res) => {
  return res.status(404).send("404 Not Found <a href='/'>Homepage</a>");
};

module.exports = notFound;
