const mongoose = require('mongoose');

const attractionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    hours: { type: String }, // e.g., "9 AM - 5 PM"
    ticketPrice: { type: Number, required: true },
    location: {
      type: String, // 'Point'
      required: true,
    },
    ratings: {
      type: Number,
      default: 0,
      min: [0, 'Rating must be at least 0'],
      max: [5, 'Rating must be at most 5'],
    },
    image: { type: String }, // URLs to images
  },
  { timestamps: true }
);

module.exports = mongoose.model('Attraction', attractionSchema);
