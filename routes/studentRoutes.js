const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Helper function to calculate total, average, and degree classification
function calculateResults(subjects) {
  let total = 0;
  let count = 0;

  if (Array.isArray(subjects)) {
    subjects.forEach(sub => {
      total += parseFloat(sub.score) || 0;
      count++;
    });
  }

  const avg = count > 0 ? total / count : 0;
  let rank = 'Fail';

  if (avg >= 70) rank = '1st Class';
  else if (avg >= 60) rank = '2:1 Upper';
  else if (avg >= 50) rank = '2:2 Lower';
  else if (avg >= 40) rank = 'Pass';

  return { total, avg: parseFloat(avg.toFixed(2)), rank };
}

// GET: Fetch all student records
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Create a new student record
router.post('/', async (req, res) => {
  try {
    const calc = calculateResults(req.body.subjects);
    const studentData = {
      ...req.body,
      totalScore: calc.total,
      average: calc.avg,
      ranking: calc.rank
    };

    const newStudent = new Student(studentData);
    const saved = await newStudent.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT: Update an existing student record by ID
router.put('/:id', async (req, res) => {
  try {
    const calc = calculateResults(req.body.subjects);
    const updatedData = {
      ...req.body,
      totalScore: calc.total,
      average: calc.avg,
      ranking: calc.rank
    };

    const updated = await Student.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE: Remove a student record by ID
router.delete('/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;