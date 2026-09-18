require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for parsing JSON and handling cross-origin requests
app.use(cors());
app.use(express.json());

// Serve static frontend files (HTML, CSS, JS) from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Attach API routing
app.use('/api/students', studentRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/studentDB')
  .then(() => {
    console.log('✅ Connected to MongoDB Database');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('❌ Database connection error:', err));