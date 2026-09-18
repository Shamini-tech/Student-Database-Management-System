🎓 Student Database Management SystemA full-stack web application designed for managing student records, tracking course enrollment, dynamically computing academic results, and persisting data using Node.js, Express, and MongoDB.🌟 Key Features3-Column Dashboard Layout: Clean, structured responsive user interface for personal, academic, and module score entries.Dynamic Results Calculation: Instant client-side computation for Total Score, Average Percentage, and Degree Classification (1st Class, 2:1 Upper, 2:2 Lower, Pass, Fail).Full CRUD Operations:Create: Register new student records.Read: View real-time database entries in a clean table format.Update: Edit existing student details seamlessly.Delete: Remove student records with prompt confirmations.RESTful API Backend: Express server integrated with Mongoose models for structured schema validation.🛠️ Tech StackFrontend: HTML5, CSS3 (CSS Grid & Flexbox), Modern JavaScript (ES6+ Fetch API)Backend: Node.js, Express.jsDatabase: MongoDB, Mongoose ODMEnvironment Configuration: dotenv, cors📁 Folder StructurePlaintextStudent Database Management System/
│
├── models/
│   └── Student.js          # Mongoose schema and database models
├── routes/
│   └── studentRoutes.js     # REST API route handlers (GET, POST, PUT, DELETE)
├── public/
│   ├── index.html          # Main application user interface
│   ├── style.css           # Styling and layout management
│   └── script.js           # Client-side validation, event handlers & API requests
├── .env                    # Environment variables (DB Connection & Port)
├── .gitignore              # Ignored files (node_modules, .env)
├── package.json            # Project dependencies and scripts
└── server.js               # Entry point for the Express server
🚀 Getting StartedPrerequisitesEnsure you have the following installed on your local system:Node.js (v14 or higher)MongoDB Community Server running locally on port 27017InstallationClone the repository:Bashgit clone https://github.com/Shamini-tech/Student-Database-Management-System.git
cd Student-Database-Management-System
Install dependencies:Bashnpm install
Configure Environment Variables:Create a .env file in the root directory:Code snippetPORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/studentDB
Start the server:Bashnode server.js
Access the application:Open your browser and navigate to:Plaintexthttp://localhost:5000
📊 API EndpointsMethodEndpointDescriptionGET/api/studentsRetrieve all student recordsPOST/api/studentsCreate a new student recordPUT/api/students/:idUpdate an existing student record by IDDELETE/api/students/:idDelete a student record by ID📄 LicenseThis project is open-source and available under the MIT License.
