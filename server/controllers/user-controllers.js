const User = require('../db/models/user-schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.signupUser = async (req, res) => {
  try {
    const { body } = req;

    // Check if user already exists by email
    const user = await User.findOne({ email: body.email });
    if (user) {
      return res.status(403).json({ message: 'Email Already Taken' });
    }

    // Check if passwords match
    if (body.password !== body.confirmPassword) {
      return res.status(403).json({ message: 'Passwords do not match' });
    }

    // Ensure password is defined
    if (!body.password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);

    // Create the new user
    const newUser = await User.create({
      ...body,
      password: hashedPassword,
      image: null, // Optional: Set to null if no image is provided
    });

    return res.status(201).json({ message: 'Account Created', data: newUser });
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(403).json({ message: 'Email or Password is wrong' });
  }

  const isMatching = await bcrypt.compare(password, user.password);
  if (!isMatching) {
    return res.status(403).json({ message: 'Email or Password is wrong' });
  }

  const token = jwt.sign(
    { id: user._id, role: 'USER' },
    process.env.SECRET_KEY,
    {
      expiresIn: '7d',
    }
  );
  res
    .status(200)
    .json({ message: 'you are logged in', token: token, id: user._id });
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If an image is uploaded, update the image field
    if (req.file) {
      user.image = req.file.path; // Update image path
    }

    // Create a filtered object to avoid updating sensitive fields
    const { password, confirmPassword, ...updateFields } = req.body;

    // Update other fields if present in the request body
    Object.assign(user, updateFields);

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'User updated successfully', data: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
