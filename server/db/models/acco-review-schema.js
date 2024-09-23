const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  accommodation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Accommodation',
    required: true,
  },
  image: {
    type: String,
    trim: true,
  },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
