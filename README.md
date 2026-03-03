Technologies / Tools Used
Backend:
- Java 21
- Spring Boot
- Spring Web
- Spring Security
- Spring Data MongoDB
- JWT (token-based authentication)
- Maven
  
Database:
- MongoDB
  
Frontend:
- React (Vite)
- React Router DOM
- Axios
- CSS (custom styling)
  
Development / Deployment tools:
- Git & GitHub
- Postman (for API testing, if you used it)
- npm / Node.js for frontend package management
  
Project Overview
AI Task Manager is a full-stack task management app where users can:

Register and login securely

Create, update, complete, and delete tasks

Get AI-based suggestions for:
Priority (HIGH / MEDIUM / LOW)
Category
Due date (if user leaves due date empty)
Description (if description is empty)
View dashboard stats (Total, Completed, High/Medium/Low counts)
Filter and sort tasks by status/category/priority/due date


How to Run the Project
Prerequisites
Java 21 (LTS)
Maven (or use included Maven wrapper)
Node.js and npm
MongoDB running locally on default port 27017

1. Clone repository
git clone https://github.com/JanardhanKomerla/ai_task_manager.git
cd ai_task_manager

2. Start MongoDB
Make sure MongoDB is running locally:

URI used in project: mongodb://localhost:27017/ai_task_manager

3. Run backend (Spring Boot)
From project root:
./mvnw spring-boot:run

On Windows:
mvnw.cmd spring-boot:run

Backend runs at:
http://localhost:8080

4. Run frontend (React + Vite)
Open a new terminal:
cd ai-task-manager-frontend
npm install
npm run dev

Frontend runs at:
http://localhost:5173 (default Vite port)

5. Use the app
Open frontend URL in browser
Register a new account
Login
Create and manage tasks with AI-based suggestions





