const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User'); // Import the User model

// @route    GET api/profile
// @desc     Get current user profile
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ status: 'Error', message: 'User not found' });
    }

    res.json({
      status: 'OK',
      user
    });
  } catch (error) {
    console.error('Server error:', error.message);
    res.status(500).json({ status: 'Error', message: 'Server error' });
  }
});

// @route    PUT api/profile
// @desc     Update user profile
// @access   Private
router.put('/', auth, async (req, res) => {
  const {
    age,
    level,
    frequency,
    injuries,
    workoutLocation,
    weight,
    height
  } = req.body;

  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ status: 'Error', message: 'User not found' });
    }

    // Update profile fields
    if (age) user.age = age;
    if (level) user.level = level;
    if (frequency) user.frequency = frequency;
    if (injuries) user.injuries = injuries;
    if (workoutLocation) user.workoutLocation = workoutLocation;
    if (weight) user.weight = weight;
    if (height) user.height = height;

    await user.save();
    console.log('Profile updated successfully:', user);

    res.json({
      status: 'OK',
      message: 'Profile updated successfully',
      user: {
        age: user.age,
        level: user.level,
        frequency: user.frequency,
        injuries: user.injuries,
        workoutLocation: user.workoutLocation,
        weight: user.weight,
        height: user.height
      }
    });
  } catch (error) {
    console.error('Server error:', error.message);
    res.status(500).json({ status: 'Error', message: 'Server error' });
  }
});

// @route    POST api/profile/signup
// @desc     Register new user and save profile data
// @access   Public
router.post('/signup', async (req, res) => {
  const {
    email,
    password,
    age,
    level,
    frequency,
    injuries,
    workoutLocation,
    weight,
    height
  } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({ status: 'Error', message: 'User already exists' });
    }

    // Create new user
    user = await User.create({
      email,
      password,
      age,
      level,
      frequency,
      injuries,
      workoutLocation,
      weight,
      height
    });

    console.log('User registered successfully:', user);

    res.json({
      status: 'OK',
      message: 'User registered successfully',
      user: {
        email: user.email,
        age: user.age,
        level: user.level,
        frequency: user.frequency,
        injuries: user.injuries,
        workoutLocation: user.workoutLocation,
        weight: user.weight,
        height: user.height
      }
    });
  } catch (error) {
    console.error('Server error:', error.message);
    res.status(500).json({ status: 'Error', message: 'Server error' });
  }
});

module.exports = router;