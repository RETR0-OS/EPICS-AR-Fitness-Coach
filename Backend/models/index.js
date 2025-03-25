const sequelize = require('../config/database');
const User = require('./User');

// Add more models here if you have any
// const AnotherModel = require('./AnotherModel');

const db = {
  sequelize,
  Sequelize: sequelize.Sequelize,
  User,
  // Add more models here
  // AnotherModel,
};

module.exports = db;