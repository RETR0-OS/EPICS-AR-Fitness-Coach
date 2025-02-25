const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// In-memory user storage
const users = [];

// @route    GET api/profile
// @desc     Get current user profile
// @access   Private
router.get('/', auth, (req, res) => {
  const user = users.find(user => user.id === req.user.id);
  
  if (!user) {
    return res.status(404).json({ status: 'Error', message: 'User not found' });
  }

  res.json({
    status: 'OK',
    user
  });
});

// @route    PUT api/profile
// @desc     Update user profile
// @access   Private
router.put('/', auth, (req, res) => {
  const {
    age,
    level,
    frequency,
    injuries,
    workoutLocation,
    weight,
    height
  } = req.body;

  const user = users.find(user => user.id === req.user.id);
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
});

module.exports = router;