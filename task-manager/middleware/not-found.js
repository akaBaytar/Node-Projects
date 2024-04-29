const notFound = (_, res) => res.status(404).send("<a href='/'>Go Home</a>");

module.exports = notFound