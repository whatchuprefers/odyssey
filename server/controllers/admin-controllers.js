const User = require('../db/models/user-schema');
const Attraction = require('../db/models/attraction-schema');
const Accommodation = require('../db/models/accommodation-schema');
const Admin = require('../db/models/admin-schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Admin Signup
module.exports.signupAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(403).json({ message: 'Email already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin account created', data: newAdmin });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};

// Admin Login
module.exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(403).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(403).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: admin._id, role: 'ADMIN' },
      process.env.SECRET_KEY,
      { expiresIn: '7d' }
    );
    res.status(200).json({ message: 'Logged in successfully', token });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getAllAccommodations = async (req, res) => {
  try {
    const accommodations = await Accommodation.find();
    res.status(200).json(accommodations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.deleteAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findByIdAndDelete(req.params.id);
    if (!accommodation)
      return res.status(404).json({ message: 'Accommodation not found' });
    res.status(200).json({ message: 'Accommodation deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getAllAttractions = async (req, res) => {
  try {
    const attractions = await Attraction.find();
    res.status(200).json(attractions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.addAttraction = async (req, res) => {
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

module.exports.updateAttraction = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = { ...req.body };

    if (req.file) {
      updateFields.image = req.file.path; // Update image path if a new image is uploaded
    }

    const updatedAttraction = await Attraction.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }
    );

    if (!updatedAttraction) {
      return res.status(404).json({ message: 'Attraction not found' });
    }

    res.status(200).json(updatedAttraction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.deleteAttraction = async (req, res) => {
  try {
    const attraction = await Attraction.findByIdAndDelete(req.params.id);
    if (!attraction)
      return res.status(404).json({ message: 'Attraction not found' });
    res.status(200).json({ message: 'Attraction deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
