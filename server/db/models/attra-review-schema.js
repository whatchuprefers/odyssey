const mongoose = require('mongoose');

const attractionReviewSchema = new mongoose.Schema(
  {
    attraction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Attraction',
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
    image: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const attractionReview = mongoose.model(
  'attractionReview',
  attractionReviewSchema
);
module.exports = attractionReview;
