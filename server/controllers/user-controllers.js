const User = require('../db/models/user-schema');
const bcrypt = require('bcrypt');

module.exports.signupUser = async (req, res) => {
  try {
    const { body } = req;

    // Debugging logs
    // console.log('Request Body:', body);

    // Check if user already exists
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

    // Debugging logs for password and salt rounds
    // console.log('Password:', body.password);
    const saltRounds = 5;
    // console.log('Salt Rounds:', saltRounds);

    // Hash the password
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);

    // Replace the plain text password with the hashed password
    body.password = hashedPassword;

    // Create the new user
    const newUser = await User.create(body);

    return res.status(201).json({ message: 'Account Created', data: newUser });
  } catch (error) {
    // console.error('Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
