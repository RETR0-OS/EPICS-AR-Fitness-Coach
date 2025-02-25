const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
require('dotenv').config();

// In-memory user storage
const users = [];

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', auth, (req, res) => {
  const user = users.find(user => user.id === req.user.id);
  if (!user) {
    return res.status(404).json({ status: 'Error', message: 'User not found' });
  }
  res.json(user);
});

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
      // See if user exists
      let user = users.find(user => user.email === email);

      if (!user) {
        return res.status(400).json({ status: 'Error', message: 'Invalid Credentials' });
      }

      // Match password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ status: 'Error', message: 'Invalid Credentials' });
      }

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      };

      // Create auth token
      const authToken = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 3600 }
      );

      // Create refresh token
      const refreshToken = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      // Set expiry time
      const expiryTime = new Date();
      expiryTime.setHours(expiryTime.getHours() + 1);

      res.json({
        status: 'OK',
        authToken,
        refreshToken,
        expiryTime
      });
    } catch (err) {
      console.error('Server error:', err.message);
      res.status(500).json({ status: 'Error', message: 'Server error' });
    }
  }
);

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 'Error', message: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;

    try {
      // See if user exists
      let user = users.find(user => user.email === email);

      if (user) {
        return res.status(400).json({ status: 'Error', message: 'User already exists' });
      }

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      user = {
        id: users.length + 1,
        firstName,
        lastName,
        email,
        password: hashedPassword
      };

      // Save user
      users.push(user);

      // Create JWT
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ 
            status: 'OK', 
            message: 'User registered successfully',
            token 
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ status: 'Internal Server Error', message: 'Server error' });
    }
  }
);

module.exports = router;