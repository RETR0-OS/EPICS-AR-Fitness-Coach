const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: '127.0.0.1',
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;