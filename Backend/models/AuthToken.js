const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AuthToken = sequelize.define('AuthToken', {
  token_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  auth_token: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
}, {
  tableName: 'auth_tokens',
  timestamps: false,
});

module.exports = AuthToken;