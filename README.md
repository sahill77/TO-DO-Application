# TaskFlow — To-Do Application

A TO-DO application built with React.js, Node.js, Express.js, and mongoDB. Features JWT authentication, user-specific task management, and a clean UI.

## Features

- User registration and login with JWT authentication
- Add, edit, delete, and toggle tasks
- Filter tasks by status (All / Completed / Pending)
- Task's dashboard
- Responsive light-themed UI
- Protected routes and API endpoints

## Tech Stack

- *Frontend:* React.js (Vite), React Router, Axios
- *Backend:* Node.js, Express.js
- *Database:* MongoDB with Mongoose
- *Auth:* JWT + bcrypt

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- MongoDB running locally (or a MongoDB Atlas connection string)


### 2. Configure Environment

Edit `server/.env` and update if needed:

PORT=5000
MONGO_URI=mongodb connection string
JWT_SECRET=secretkey

### 3. Run the Application

# for run both client and server on root used concurrently
npm run dev


### 4. Use the App

1. Register a new account
2. Log in and start managing your tasks..

## Folder Structure

├── server/
│   ├── config/db.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── client/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── utils/
│       ├── App.jsx
│       └── main.jsx

