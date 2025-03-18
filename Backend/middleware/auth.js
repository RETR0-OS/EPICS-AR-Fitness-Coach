const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User'); // Import the User model
const axios = require('axios'); // Ensure axios is imported

module.exports = async function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ status: 'Unauthorized', message: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    // If token is expired, try to refresh it
    if (err.name === 'TokenExpiredError') {
      const refreshToken = req.header('x-refresh-token');
      if (refreshToken) {
        try {
          const newTokens = await refreshAuthToken(refreshToken);
          if (newTokens.success) {
            res.setHeader('x-auth-token', newTokens.authToken);
            req.user = jwt.verify(newTokens.authToken, process.env.JWT_SECRET).user;
            return next();
          }
        } catch (refreshError) {
          return res.status(401).json({ status: 'Unauthorized', message: 'Token refresh failed' });
        }
      }
    }
    res.status(401).json({ status: 'Unauthorized', message: 'Token is not valid' });
  }
};

async function refreshAuthToken(refreshToken) {
  try {
    const response = await axios.post('http://localhost:5001/api/auth/refresh-token', { refreshToken });
    if (response.data.status === 'OK') {
      return {
        success: true,
        authToken: response.data.authToken
      };
    }
    return {
      success: false,
      message: 'Failed to refresh token'
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Server error'
    };
  }
}