const Review = require('../db/models/review-schema');

const getReview = async (req, res) => {
  const review = await Review.find();
  res.status(200).json({ message: 'Success', data: review });
};

const postReview = async (req, res) => {
  const { name } = req.body;
  const { originalname } = req.file;
  const review = await Review.create({
    name: name,
    image: `http://localhost:${process.env.PORT}/uploads/${originalname}`,
  });
  res.status(201).json({ message: 'Success', data: review });
};

module.exports = { getReview, postReview };
