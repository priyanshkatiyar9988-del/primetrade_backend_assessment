🚀 Task Management System (MERN Stack Backend + Frontend)

A full-stack Task Management System built using
Node.js, Express, MongoDB, JWT Authentication, and React (Frontend).

This project demonstrates real-world backend development including authentication, role-based authorization, CRUD operations, validation, error handling, and API documentation.

✨ Features

🔐 Authentication System

.User Registration
.User Login
.JWT Token Authentication
.Password Hashing using bcrypt


👤 Role-Based Access Control (RBAC)

.User Role (default)
.Admin Role
.Admin-only permissions (Delete Tasks)
.Secure route protection


📋 Task Management (CRUD)

.Create Task
.Get All Tasks
.Get Single Task
.Update Task
.Delete Task


🛡️ Security & Middleware

.JWT Protected Routes
.Input Validation (express-validator)
.Centralized Error Handling
.Helmet Security Middleware
.CORS Enabled
.404 Route Handling



📖 API Documentation

.Swagger UI Integration
.Interactive API testing in browser


🧑‍💻 Tech Stack

Backend

.Node.js
.Express.js (v5)
.MongoDB + Mongoose
.JWT (Authentication)
.bcrypt (Password Hashing)
.express-validator
.swagger-ui-express


Frontend

.React.js
.Axios
.React Router DOM
.Tailwind CSS / CSS


📁 Project Structure

backend/
│── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── validations/
│   ├── utils/
│   ├── app.js
│   └── server.js

frontend/
│── src/
│   ├── pages/
│   ├── components/
│   ├── services/
│   └── App.js


⚙️ Installation & Setup

1️⃣ Clone Repository

git clone https://github.com/your-username/task-manager.git
cd task-manager


2️⃣ Backend Setup

cd backend
npm install


🔑 Create .env file

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


▶️ Run Backend

npm run dev


3️⃣ Frontend Setup

cd frontend
npm install
npm run dev


🔗 API Endpoints

🔐 Auth Routes

Method	                     Endpoint                       Description
POST	                /api/v1/auth/register	           Register User
POST	                 /api/v1/auth/login             	Login User
GET	                    /api/v1/auth/profile     	Get User Profile (Protected)


📋 Task Routes

Method	                      Endpoint	                  Description
POST	                     /api/v1/tasks           	Create Task
GET	                         /api/v1/tasks           	Get All Tasks
GET	                      v/api/v1/tasks/:id	       Get Single Task
PUT	                       /api/v1/tasks/:id	         Update Task
DELETE	                    /api/v1/tasks/:id	   Delete Task (Admin Only)


🔐 Authentication Flow

1.User registers → receives JWT token
2.User logs in → receives JWT token
3.Token is sent in headers:
Authorization: Bearer <token>
4.Protected routes verify token before access


🧪 Testing (Postman / Thunder Client)

🔹 Register

POST /api/v1/auth/register
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "password": "123456"
}


🔹 Login

POST /api/v1/auth/login
{
  "email": "john@gmail.com",
  "password": "123456"
}


🔹 Create Task

POST /api/v1/tasks
Headers: Authorization: Bearer <token>

{
  "title": "Complete Project",
  "description": "Finish backend assignment",
  "status": "Pending"
}


📖 Swagger Documentation

After running backend:

http://localhost:5000/api-docs

.View all APIs
.Test APIs directly in browser
.See request/response schema


👮 Role-Based Access

Role	                                   Permissions
User	                            Create, View, Update own tasks
Admin	                           View all tasks + Delete any task


🚀 Future Improvements

.Task filtering & pagination
.Refresh token system
.File upload support
.Email verification
.Deployment (Render / Vercel / Netlify)


🧾 Environment Variables

PORT=5000
MONGO_URI=your_mongo_url
JWT_SECRET=your_secret_key


📌 Deployment (Optional)

Backend: Render / Railway
Frontend: Vercel / Netlify
Database: MongoDB Atlas


👨‍💻 Author

PRIYANSH KATIYAR


📜 License

This project is created for educational / internship assignment purposes only.


🏁 Final Result

✔ Fully working backend
✔ Secure authentication
✔ Role-based access
✔ Production-level structure
✔ API validation + error handling
✔ Swagger documentation support
✔ Ready for internship submission 🚀
