/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

// Handles user registration
const register = async (req, res) => {
  // Checks if name, email, and password are provided
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'Name, Email & Password are required', success: false });
  }

  try {
    // Then checks if user email exists in MongoDB before storing data
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(200).send({ message: 'User already exists', success: false });
    }
    // Generate salt and hash the password before storing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user object with hashed password
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save the new user to MongoDB and send success response
    await newUser.save();
    // res data will be used on client side to render message and confirm success status
    return res.status(201).send({ message: 'Account created!', success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Error creating user', success: false, err });
  }
};

// Handles user login
const login = async (req, res) => {
  // Checks if both email and password are provided
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'Email and Password required', success: false });
  }

  try {
    // Find the user by email and select specific fields (name, email, password)
    const user = await User.findOne({ email: req.body.email }).select(
      'name email password',
    );

    // If user not found, return error
    if (!user) {
      return res.status(404).send({ message: 'User not found', success: false });
    }

    // Compare provided password with stored hashed password
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password,
    );

    // If password is incorrect, return error
    if (!isPasswordCorrect) {
      return res.status(400).send({ message: 'Password is incorrect', success: false });
    }

    // Create a payload for the JWT token
    const payload = {
      id: user._id,
      name: user.name,
    };

    // Generate JWT token with payload and set expiration time to 1 day
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Set the token as a cookie and send success response
    // Token will be stored in UI
    return res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .send({ message: 'Login success', success: true, data: token });
  } catch (err) {
    console.log(err);
    return res.status(200).send({ message: 'Error logging in', success: false, err });
  }
};

// Handles user logout
const logout = async (req, res) => {
  // Clears the access_token cookie and sends success response
  res.clearCookie('access_token');
  return res.status(200).send({ message: 'logout success', success: true });
};

module.exports = {
  register,
  login,
  logout,
};
