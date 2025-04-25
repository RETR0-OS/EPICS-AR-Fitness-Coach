const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');
const initDatabase = require('./config/initDatabase');
const authRoutes = require('./routes/api/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes.router);
app.use('/api/profile', require('./routes/api/profile'));

// Basic route for testing
app.get('/', (req, res) => res.send('API Running'));

// Test database connection and sync models
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Database synced...');
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });