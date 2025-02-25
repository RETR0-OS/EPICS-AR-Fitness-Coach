const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  level: {
    type: String
  },
  frequency: {
    type: String
  },
  injuries: {
    type: String
  },
  workoutLocation: {
    type: String
  },
  weight: {
    type: Number
  },
  height: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('user', UserSchema);