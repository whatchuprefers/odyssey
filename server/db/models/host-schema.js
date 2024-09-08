const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hostSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    accommodations: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Accommodation',
      },
    ],
  },
  { timestamps: true }
);

// Optionally create indexes for performance optimization
hostSchema.index({ username: 1 });
hostSchema.index({ email: 1 });

const Host = mongoose.model('Host', hostSchema);

module.exports = Host;
