const mongoose = require('mongoose');

// Define the schema for student records
const studentSchema = new mongoose.Schema({
  // Unique identification key
  studentID: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  surname: { type: String, required: true },
  address: { type: String, default: '' },
  gender: { type: String, default: 'Female' },
  dob: { type: String, default: '' },
  mobile: { type: String, default: '' },
  email: { type: String, default: '' },

  // Nested guardian info object
  guidance: {
    relation: { type: String, default: '' },
    firstname: { type: String, default: '' },
    surname: { type: String, default: '' },
    address: { type: String, default: '' },
    mobile: { type: String, default: '' },
    email: { type: String, default: '' }
  },

  // Academic Course Details
  course: { type: String, default: '' },
  courseCode: { type: String, default: '' },
  faculty: { type: String, default: '' },
  deanOfFaculty: { type: String, default: '' },
  programLeader: { type: String, default: '' },
  courseTutor: { type: String, default: '' },

  // Subject marks stored as an array of objects
  subjects: [{
    name: String,
    score: Number
  }],

  // Computed summary metrics
  totalScore: { type: Number, default: 0 },
  average: { type: Number, default: 0 },
  ranking: { type: String, default: 'Pending' },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema);