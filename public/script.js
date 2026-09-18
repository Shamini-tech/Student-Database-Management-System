const API_URL = '/api/students';

// Initialize events when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  fetchStudents();

  // Attach dynamic listener to all score inputs for instant calculations
  document.querySelectorAll('.subject-score').forEach(input => {
    input.addEventListener('input', computeLiveResults);
  });

  document.getElementById('btnCalculate').addEventListener('click', computeLiveResults);
  document.getElementById('studentForm').addEventListener('submit', saveStudent);
  document.getElementById('btnReset').addEventListener('click', resetForm);

  // Run initial calculation
  computeLiveResults();
});

// Compute dynamic score results on the client side
function computeLiveResults() {
  const subjectInputs = document.querySelectorAll('.subject-score');
  let total = 0;
  let count = 0;

  subjectInputs.forEach(i => {
    const val = parseFloat(i.value) || 0;
    total += val;
    count++;
  });

  const avg = count > 0 ? (total / count) : 0;
  let rank = 'Fail';

  if (avg >= 70) rank = '1st Class';
  else if (avg >= 60) rank = '2:1 Upper';
  else if (avg >= 50) rank = '2:2 Lower';
  else if (avg >= 40) rank = 'Pass';

  document.getElementById('displayTotal').value = total;
  document.getElementById('displayAvg').value = avg.toFixed(2) + '%';
  document.getElementById('displayRanking').value = rank;

  return { total, avg: parseFloat(avg.toFixed(2)), rank };
}

// Fetch and render existing database records in table rows
async function fetchStudents() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    const tbody = document.getElementById('recordsTableBody');
    tbody.innerHTML = '';

    if (!Array.isArray(data)) return;

    data.forEach(s => {
      tbody.innerHTML += `
        <tr>
          <td>${s.studentID}</td>
          <td>${s.firstname} ${s.surname}</td>
          <td>${s.course || 'N/A'}</td>
          <td>${s.totalScore}</td>
          <td>${s.average}%</td>
          <td><strong>${s.ranking}</strong></td>
          <td>
            <button class="btn-edit" onclick="editStudent('${s._id}')">Edit</button>
            <button class="btn-danger" onclick="deleteStudent('${s._id}')">Delete</button>
          </td>
        </tr>
      `;
    });
  } catch (err) {
    console.error('Error fetching student list:', err);
  }
}

// Save or Update Student Record
async function saveStudent(e) {
  e.preventDefault();

  const mongoId = document.getElementById('recordMongoId').value;
  const computed = computeLiveResults();

  const subjectInputs = document.querySelectorAll('.subject-score');
  const subjects = Array.from(subjectInputs).map(i => ({
    name: i.dataset.name,
    score: parseFloat(i.value) || 0
  }));

  const payload = {
    studentID: document.getElementById('studentID').value,
    firstname: document.getElementById('firstname').value,
    surname: document.getElementById('surname').value,
    address: document.getElementById('address').value,
    gender: document.getElementById('gender').value,
    dob: document.getElementById('dob').value,
    mobile: document.getElementById('mobile').value,
    email: document.getElementById('email').value,
    guidance: {
      relation: document.getElementById('guardianRelation').value,
      firstname: document.getElementById('guardianFirstname').value,
      surname: document.getElementById('guardianSurname').value,
      address: document.getElementById('guardianAddress').value,
      mobile: document.getElementById('guardianMobile').value,
      email: document.getElementById('guardianEmail').value
    },
    course: document.getElementById('course').value,
    courseCode: document.getElementById('courseCode').value,
    faculty: document.getElementById('faculty').value,
    deanOfFaculty: document.getElementById('deanOfFaculty').value,
    programLeader: document.getElementById('programLeader').value,
    courseTutor: document.getElementById('courseTutor').value,
    subjects: subjects,
    totalScore: computed.total,
    average: computed.avg,
    ranking: computed.rank
  };

  const method = mongoId ? 'PUT' : 'POST';
  const url = mongoId ? `${API_URL}/${mongoId}` : API_URL;

  try {
    const response = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      resetForm();
      fetchStudents();
    } else {
      const errorData = await response.json();
      alert('Save Error: ' + (errorData.error || 'Check input details'));
    }
  } catch (err) {
    console.error('Network error on save:', err);
  }
}

// Fetch record details and populate the form fields for editing
async function editStudent(id) {
  const res = await fetch(API_URL);
  const students = await res.json();
  const s = students.find(item => item._id === id);

  if (!s) return;

  document.getElementById('recordMongoId').value = s._id;
  document.getElementById('studentID').value = s.studentID;
  document.getElementById('firstname').value = s.firstname;
  document.getElementById('surname').value = s.surname;
  document.getElementById('address').value = s.address || '';
  document.getElementById('gender').value = s.gender || 'Female';
  document.getElementById('dob').value = s.dob || '';
  document.getElementById('mobile').value = s.mobile || '';
  document.getElementById('email').value = s.email || '';

  if (s.guidance) {
    document.getElementById('guardianRelation').value = s.guidance.relation || 'Father';
    document.getElementById('guardianFirstname').value = s.guidance.firstname || '';
    document.getElementById('guardianSurname').value = s.guidance.surname || '';
    document.getElementById('guardianAddress').value = s.guidance.address || '';
    document.getElementById('guardianMobile').value = s.guidance.mobile || '';
    document.getElementById('guardianEmail').value = s.guidance.email || '';
  }

  document.getElementById('course').value = s.course || '';
  document.getElementById('courseCode').value = s.courseCode || '';
  document.getElementById('faculty').value = s.faculty || '';
  document.getElementById('deanOfFaculty').value = s.deanOfFaculty || '';
  document.getElementById('programLeader').value = s.programLeader || '';
  document.getElementById('courseTutor').value = s.courseTutor || '';

  if (s.subjects) {
    const inputs = document.querySelectorAll('.subject-score');
    inputs.forEach(input => {
      const found = s.subjects.find(sub => sub.name === input.dataset.name);
      if (found) input.value = found.score;
    });
  }

  computeLiveResults();
}

// Delete Record
async function deleteStudent(id) {
  if (confirm('Are you sure you want to delete this student record?')) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchStudents();
  }
}

// Clear form inputs
function resetForm() {
  document.getElementById('studentForm').reset();
  document.getElementById('recordMongoId').value = '';
  computeLiveResults();
}