const Host = require('../db/models/host-schema');
const Accommodation = require('../db/models/accommodation-schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.signupHost = async (req, res) => {
  const { body } = req;
  const host = await Host.findOne({ email: body.email });

  if (host) {
    return res.status(403).json({ message: 'Email Already Taken' });
  }
  if (body.password != body.confirmPassword) {
    return res.status(403).json({ message: 'Password dont match' });
  }

  const hashedPassword = await bcrypt.hash(body.password, 2);
  body.password = hashedPassword;

  const newHost = await Host.create(body);

  return res.status(201).json({ message: 'Account Created', data: newHost });
};

module.exports.loginHost = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    const host = await Host.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!host) {
      return res
        .status(403)
        .json({ message: 'Email/Username or Password is incorrect' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatching = await bcrypt.compare(password, host.password);
    if (!isMatching) {
      return res
        .status(403)
        .json({ message: 'Email/Username or Password is incorrect' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: host._id, role: 'HOST' },
      process.env.SECRET_KEY,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'You are logged in',
      token: token,
      id: host._id,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createHost = async (req, res) => {
  try {
    const host = new Host(req.body);
    await host.save();
    res.status(201).json(host);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllHosts = async (req, res) => {
  try {
    const hosts = await Host.find();
    res.status(200).json(hosts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getHostById = async (req, res) => {
  try {
    const host = await Host.findById(req.params.id).populate('accommodations');
    if (!host) {
      return res.status(404).json({ message: 'Host not found' });
    }
    res.status(200).json(host);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateHost = async (req, res) => {
  try {
    const host = await Host.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!host) {
      return res.status(404).json({ message: 'Host not found' });
    }
    res.status(200).json(host);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteHost = async (req, res) => {
  try {
    const host = await Host.findByIdAndDelete(req.params.id);
    if (!host) {
      return res.status(404).json({ message: 'Host not found' });
    }
    res.status(200).json({ message: 'Host deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAccommodationsByHost = async (req, res) => {
  try {
    const hostId = req.params.id;
    const accommodations = await Accommodation.find({ host: hostId });

    if (!accommodations) {
      return res
        .status(404)
        .json({ message: 'No accommodations found for this host' });
    }

    res.status(200).json(accommodations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { id } = req.params;

  try {
    const host = await Host.findById(id);
    if (!host) return res.status(404).json({ message: 'Host not found' });

    const isMatch = await bcrypt.compare(currentPassword, host.password);
    if (!isMatch)
      return res.status(403).json({ message: 'Current password is incorrect' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    host.password = hashedPassword;
    await host.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
