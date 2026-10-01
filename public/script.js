// ==========================================
// 1. AUTHENTICATION & API HELPERS
// ==========================================

// Redirect to login if token is missing
const token = localStorage.getItem('token');
if (!token) {
  window.location.href = '/login.html';
}

// Helper function to handle fetch calls with JWT authorization header
async function fetchWithAuth(url, options = {}) {
  options.headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  };

  const response = await fetch(url, options);

  // If token is invalid or expired, clear storage and redirect to login
  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem('token');
    window.location.href = '/login.html';
  }

  return response;
}

// Logout helper
function logout() {
  localStorage.removeItem('token');
  window.location.href = '/login.html';
}

// ==========================================
// 2. DOM LOAD & INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  fetchStudents();

  // Attach event listeners to mark inputs to auto-calculate scores
  const markInputs = document.querySelectorAll('.mark-input');
  markInputs.forEach(input => {
    input.addEventListener('input', calculateResults);
  });

  // Attach form submission listener
  const studentForm = document.getElementById('student-form');
  if (studentForm) {
    studentForm.addEventListener('submit', handleFormSubmit);
  }
});

// ==========================================
// 3. AUTO-CALCULATE SCORES & GRADES
// ==========================================

function calculateResults() {
  const markInputs = document.querySelectorAll('.mark-input');
  let total = 0;
  let count = 0;

  markInputs.forEach(input => {
    const val = parseFloat(input.value);
    if (!isNaN(val)) {
      total += val;
      count++;
    }
  });

  const average = count > 0 ? (total / count).toFixed(2) : 0;

  // Set total and average in DOM
  const totalScoreElem = document.getElementById('totalScore');
  const averageElem = document.getElementById('average');
  const rankingElem = document.getElementById('ranking');

  if (totalScoreElem) totalScoreElem.value = total;
  if (averageElem) averageElem.value = average;

  // Calculate Ranking/Class based on Average
  if (rankingElem) {
    if (average >= 70) rankingElem.value = '1st Class';
    else if (average >= 60) rankingElem.value = '2nd Class Upper';
    else if (average >= 50) rankingElem.value = '2nd Class Lower';
    else if (average >= 40) rankingElem.value = 'Pass';
    else rankingElem.value = 'Fail';
  }
}

// ==========================================
// 4. API CALLS (CRUD OPERATIONS)
// ==========================================

// Fetch all students
async function fetchStudents() {
  try {
    const res = await fetchWithAuth('/api/students');
    if (!res.ok) throw new Error('Failed to fetch students');
    
    const students = await res.json();
    renderStudentList(students);
  } catch (err) {
    console.error('Error fetching students:', err);
  }
}

// Render students list into UI table/list
function renderStudentList(students) {
  const listContainer = document.getElementById('student-list');
  if (!listContainer) return;

  listContainer.innerHTML = '';

  students.forEach(student => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.studentID || ''}</td>
      <td>${student.firstname || ''} ${student.surname || ''}</td>
      <td>${student.course || ''}</td>
      <td>${student.average || 0}</td>
      <td>${student.ranking || ''}</td>
      <td>
        <button onclick="editStudent('${student._id}')">Edit</button>
        <button onclick="deleteStudent('${student._id}')">Delete</button>
      </td>
    `;
    listContainer.appendChild(row);
  });
}

// Submit / Add New Student
async function handleFormSubmit(e) {
  e.preventDefault();

  const formData = {
    studentID: document.getElementById('studentID')?.value,
    firstname: document.getElementById('firstname')?.value,
    surname: document.getElementById('surname')?.value,
    address: document.getElementById('address')?.value,
    gender: document.getElementById('gender')?.value,
    dob: document.getElementById('dob')?.value,
    mobile: document.getElementById('mobile')?.value,
    email: document.getElementById('email')?.value,
    course: document.getElementById('course')?.value,
    courseCode: document.getElementById('courseCode')?.value,
    faculty: document.getElementById('faculty')?.value,
    deanOfFaculty: document.getElementById('deanOfFaculty')?.value,
    programLeader: document.getElementById('programLeader')?.value,
    courseTutor: document.getElementById('courseTutor')?.value,
    totalScore: parseFloat(document.getElementById('totalScore')?.value) || 0,
    average: parseFloat(document.getElementById('average')?.value) || 0,
    ranking: document.getElementById('ranking')?.value
  };

  try {
    const res = await fetchWithAuth('/api/students', {
      method: 'POST',
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      alert('Student record saved successfully!');
      resetForm();
      fetchStudents();
    } else {
      const errorData = await res.json();
      alert(`Error saving record: ${errorData.message || 'Server error'}`);
    }
  } catch (err) {
    console.error('Save error:', err);
    alert('Failed to connect to the server.');
  }
}

// Delete Student Record
async function deleteStudent(id) {
  if (!confirm('Are you sure you want to delete this student?')) return;

  try {
    const res = await fetchWithAuth(`/api/students/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      alert('Student record deleted successfully.');
      fetchStudents();
    } else {
      alert('Failed to delete student.');
    }
  } catch (err) {
    console.error('Delete error:', err);
  }
}

// Reset Form Controls
function resetForm() {
  const form = document.getElementById('student-form');
  if (form) form.reset();
}