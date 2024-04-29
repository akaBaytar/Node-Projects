const path = require('path');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../../errors');

const uploadImage = async (req, res) => {
  // checking the file in the request and throwing an error if there is no file
  if (!req.files) {
    throw new BadRequestError('No file upload.');
  }

  // Assigning the image from the files to a variable
  const image = req.files.image;

  // throwing an error if the mimetype of the uploaded file is not an 'image'
  if (!image.mimetype.startsWith('image')) {
    throw new BadRequestError('Please upload valid image.');
  }

  // if the image size exceeds 2MB, an error should be thrown
  if (image.size > 1024 * 1024 * 2) {
    throw new BadRequestError('Please upload image smaller than 2MB.');
  }

  // creating the image path
  const imagePath = path.join(__dirname, '../../public/upload/' + `${image.name}`);

  // moving the image to its path - fileupload module
  await image.mv(imagePath);

  res.status(StatusCodes.OK).json({ image: `/upload/${image.name}` });
};

module.exports = uploadImage;
