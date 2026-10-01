const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// CRITICAL: Ensure you are exporting mongoose.model('User', userSchema)
module.exports = mongoose.models.User || mongoose.model('User', userSchema);