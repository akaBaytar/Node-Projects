const errorHandler = async (_, __, res) => {
  return res.status(500).json({ msg: 'An error occurred.' });
};

module.exports = errorHandler;
