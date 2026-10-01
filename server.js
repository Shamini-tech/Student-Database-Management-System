require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Authentication API Routes
app.use('/api/auth', authRoutes);

// Protected Student API Routes
app.use('/api/students', studentRoutes);

// Catch-all route to serve login.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/studentDB_v2')
  .then(() => {
    console.log('✅ Connected to MongoDB Database');
    app.listen(PORT, () => console.log(`🚀 EduPulse running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('❌ Database connection error:', err));