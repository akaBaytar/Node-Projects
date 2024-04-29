// import the schema created for the 'products' field in the response object
const Product = require('../models/product');

// function to list the products
const getAllProducts = async (req, res) => {
  // destructuring the query parameters from the request
  const { featured, company, name, sort, select, filter } = req.query;
  const query = {};

  // filtering with query parameters
  if (featured) query.featured = featured === 'true' ? true : false;
  if (company) query.company = company;
  if (name) query.name = { $regex: name, $options: 'i' };

  // filtering based on numerical (e.g.: price <= 100, rating > 4)
  if (filter) {
    const operators = {
      '>': '$gt',
      '<': '$lt',
      '=': '$eq',
      '>=': '$gte',
      '<=': '$lte',
    };

    // making numeric filters more user-friendly through regex
    const regex = /\b(<|>|>=|=|<|<=)\b/g;
    const options = ['price', 'rating'];

    let filters = filter.replace(regex, (match) => `-${operators[match]}-`);

    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');

      if (options.includes(field)) {
        query[field] = { [operator]: +value };
      }
    });
  }

  // filtering products with the queries in the request and assigning them to a variable
  let result = Product.find(query);

  // sorting by specific parameters, default: sort by creation date
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

  // selecting the fields in the response object based on specific parameters
  if (select) {
    const selectMethod = select.split(',').join(' ');
    result = result.select(selectMethod);
  }

  // limited response object by user (default: 12) and pagination operations (default page: 1)
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 12;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  // after performing filtering, limiting and sorting result is retrieved and sent to the user
  const products = await result;

  res.status(200).json({
    page: page,
    limit: products.length,
    products,
  });
};

module.exports = { getAllProducts };
