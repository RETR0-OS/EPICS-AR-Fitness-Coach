const { Sequelize } = require('sequelize');
const sequelize = require('./database');

const initDatabase = async () => {
  try {
    await sequelize.query('CREATE DATABASE IF NOT EXISTS ar_fitness');
    await sequelize.query('USE ar_fitness');

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS auth_tokens (
        token_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        auth_token TEXT NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
      )
    `);

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS fitness_data (
        fitness_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        exercise_type TEXT NOT NULL,
        duration INT NOT NULL,
        calories_burned INT NOT NULL,
        recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
      )
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

module.exports = initDatabase;