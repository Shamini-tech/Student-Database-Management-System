# Student Database Management System

A web-based full-stack application designed to manage student records, user authentication, and administrative controls efficiently.

---

## Features

- **User Authentication:** Secure login and registration system with middleware protection.
- **Student Record Management:** Add, view, update, and delete student records (CRUD operations).
- **RESTful API Routes:** Clean separation of concerns with modular route handling for authentication and student management.
- **Responsive Dashboard:** Simple and intuitive front-end interface built with standard HTML/CSS and JavaScript.

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB / Mongoose (or SQL equivalent)
- **Frontend:** HTML5, CSS3, JavaScript (Fetch API)
- **Authentication:** Middleware-based session/token validation

---

## Directory Structure

```text
Student Database Management System/
├── middleware/         # Custom authentication & request validation middleware
├── models/             # Database schemas (User.js, Student models)
├── public/             # Static frontend files (script.js, login.html, etc.)
├── routes/             # API endpoints (authRoutes.js, studentRoutes.js)
├── .gitignore          # Files excluded from version control
├── package.json        # Dependencies and project scripts
└── server.js           # Main application entry point
