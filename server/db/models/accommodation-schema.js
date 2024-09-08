const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accommodationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price must be a positive number'],
    },
    amenities: {
      type: [String],
      default: [],
    },
    ratings: {
      type: Number,
      default: 0,
      min: [0, 'Rating must be at least 0'],
      max: [5, 'Rating must be at most 5'],
    },
    host: {
      type: Schema.Types.ObjectId,
      ref: 'Host',
      required: true,
    },
  },
  { timestamps: true }
);
const Accommodation = mongoose.model('Accommodation', accommodationSchema);

module.exports = Accommodation;
