const Attraction = require('../db/models/attraction-schema');

// Get all attractions
exports.getAttractions = async (req, res) => {
  try {
    const attractions = await Attraction.find();
    res.json(attractions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific attraction by ID
exports.getAttractionById = async (req, res) => {
  try {
    const attraction = await Attraction.findById(req.params.id);
    if (!attraction)
      return res.status(404).json({ message: 'Attraction not found' });
    res.json(attraction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new attraction
exports.createAttraction = async (req, res) => {
  try {
    const { name, description, hours, ticketPrice, location, ratings } =
      req.body;
    const image = req.file ? req.file.path : null;

    const attraction = new Attraction({
      name,
      image,
      description,
      hours,
      ticketPrice,
      location,
      ratings,
    });

    await attraction.save();
    res.status(201).json(attraction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an attraction
exports.updateAttraction = async (req, res) => {
  try {
    const updatedAttraction = await Attraction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAttraction)
      return res.status(404).json({ message: 'Attraction not found' });
    res.json(updatedAttraction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an attraction
exports.deleteAttraction = async (req, res) => {
  try {
    const deletedAttraction = await Attraction.findByIdAndDelete(req.params.id);
    if (!deletedAttraction)
      return res.status(404).json({ message: 'Attraction not found' });
    res.json({ message: 'Attraction deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
