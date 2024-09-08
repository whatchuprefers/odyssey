const Accommodation = require('../db/models/accommodation-schema');

// Create a new accommodation
exports.createAccommodation = async (req, res) => {
  try {
    const { name, address, price, amenities, ratings, host } = req.body;
    const image = req.file ? req.file.path : null;

    const accommodation = new Accommodation({
      name,
      image,
      address,
      price,
      amenities,
      ratings,
      host,
    });

    await accommodation.save();
    res.status(201).json(accommodation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all accommodations
exports.getAllAccommodations = async (req, res) => {
  try {
    const accommodations = await Accommodation.find();
    res.status(200).json(accommodations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a specific accommodation by ID
exports.getAccommodationById = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);
    if (!accommodation) {
      return res.status(404).json({ message: 'Accommodation not found' });
    }
    res.status(200).json(accommodation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an accommodation by ID
exports.updateAccommodation = async (req, res) => {
  try {
    const updateFields = { ...req.body };
    if (req.file) {
      updateFields.image = req.file.path;
    }

    const accommodation = await Accommodation.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );
    if (!accommodation) {
      return res.status(404).json({ message: 'Accommodation not found' });
    }
    res.status(200).json(accommodation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an accommodation by ID
exports.deleteAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findByIdAndDelete(req.params.id);
    if (!accommodation) {
      return res.status(404).json({ message: 'Accommodation not found' });
    }
    res.status(200).json({ message: 'Accommodation deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAccommodationsForHost = async (req, res) => {
  try {
    const hostId = req.params.id;
    const host = await Host.findById(hostId);
    if (!host) {
      return res.status(404).json({ message: 'Host not found' });
    }

    const accommodations = await Accommodation.find({
      _id: { $in: host.accommodations },
    });
    res.status(200).json(accommodations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
