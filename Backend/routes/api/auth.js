const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const AuthToken = require('../../models/AuthToken');
require('dotenv').config();

// Authentication middleware
const auth = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ status: 'Error', message: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user from payload
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ status: 'Error', message: 'Token is not valid' });
  }
};


// @route    POST api/auth/signup
// @desc     Register user
// @access   Public
router.post(
  '/signup',
  [
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 8 characters long').isLength({ min: 8 }),
    check('password', 'Password must contain at least 1 symbol, 1 uppercase & 1 lowercase letter')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
  ],
  async (req, res) => {
    console.log('Request body:', req.body); // Terminal comment
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Error");
      return res.status(400).json({ status: 'Error', message: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;

    try {
      let user = await User.findOne({ where: { email } });

      if (user) {
        return res.status(400).json({ status: 'Error', message: 'User already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(password, salt);

      console.log({firstName, lastName, email, password_hash}); // Terminal comment


      // Save the user information to the database
      user = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password_hash: password_hash,
        createdAt: new Date(),
      });

      if (!user) {
        return res.status(500).json({ status: 'Error', message: 'Failed to create user' });
      }

      const payload = {
        user: {
          id: user.user_id
        }
      };

      const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      const expires_at = new Date();
      expires_at.setHours(expires_at.getHours() + 1);

      // Save the token information to the database
      await AuthToken.create({
        user_id: user.user_id,
        auth_token: token,
        expires_at
      });

      console.error('User registered successfully:', user); // Terminal comment
      res.json({ 
        status: 'OK', 
        message: 'User registered successfully 1234',
        token 
      });
    } catch (err) {
      console.error('Server error:', err.message);
      res.status(500).json({ status: 'Error', message: 'Server error' });
    }
  }
);

// @route    POST api/auth/login
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 'Error', message: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ where: { email } });

      if (!user) {
        console.log('User not found'); // Debugging statement
        return res.status(400).json({ status: 'Error', message: 'Invalid Credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password_hash);

      if (!isMatch) {
        console.log('Password does not match'); // Debugging statement
        return res.status(400).json({ status: 'Error', message: 'Invalid Credentials' });
      }

      const payload = {
        user: {
          id: user.user_id
        }
      };

      const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      const expires_at = new Date();
      expires_at.setHours(expires_at.getHours() + 1);

      // Save the token information to the database
      await AuthToken.create({
        user_id: user.user_id,
        auth_token: token,
        expires_at
      });

      console.log('User logged in successfully:', user); // Terminal comment
      res.json({ 
        status: 'OK', 
        token 
      });
    } catch (err) {
      console.error('Server error:', err.message);
      res.status(500).json({ status: 'Error', message: 'Server error' });
    }
  }
);

module.exports = {router,auth};