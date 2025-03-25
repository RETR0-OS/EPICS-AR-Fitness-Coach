const { Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: '127.0.0.1',
  dialect: 'mysql',
  logging: false,
});

const addMockData = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Mock data
    const users = [
      { username: 'john_doe', email: 'john@example.com', password: 'Password123!' },
      { username: 'jane_doe', email: 'jane@example.com', password: 'Password123!' },
      { username: 'alice_smith', email: 'alice@example.com', password: 'Password123!' },
      { username: 'bob_jones', email: 'bob@example.com', password: 'Password123!' },
    ];

    for (const userData of users) {
      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(userData.password, salt);

      await User.create({
        username: userData.username,
        email: userData.email,
        password_hash,
      });
    }

    console.log('Mock data added successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
};

addMockData();