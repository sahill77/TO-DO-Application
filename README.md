# TaskFlow — MERN To-Do Application

A full-stack to-do application built with MongoDB, Express.js, React.js, and Node.js. Features JWT authentication, user-specific task management, and a clean modern UI.

## Features

- User registration and login with JWT authentication
- Add, edit, delete, and toggle tasks
- Filter tasks by status (All / Completed / Pending)
- Task statistics dashboard
- Responsive elegant light-themed UI
- Protected routes and API endpoints

## Tech Stack

- **Frontend:** React.js (Vite), React Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Auth:** JWT + bcrypt

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- MongoDB running locally (or a MongoDB Atlas connection string)

```bash
# Install all dependencies (from root folder)
npm run install-all
```

### 2. Configure Environment

Edit `server/.env` and update if needed:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern-todo
JWT_SECRET=your_secret_key_here
```

### 3. Run the Application

```bash
# Start both client and server from the root folder
npm run dev
```

- Backend runs on: `http://localhost:5000`
- Frontend runs on: `http://localhost:3000`

### 4. Use the App

1. Open `http://localhost:3000` in your browser
2. Register a new account
3. Log in and start managing your tasks!

## API Endpoints

| Method | Route               | Auth | Description          |
|--------|---------------------|------|----------------------|
| POST   | /api/auth/register  | No   | Register new user    |
| POST   | /api/auth/login     | No   | Login, returns JWT   |
| GET    | /api/auth/me        | Yes  | Get current user     |
| GET    | /api/tasks          | Yes  | Get all user tasks   |
| POST   | /api/tasks          | Yes  | Create a task        |
| PUT    | /api/tasks/:id      | Yes  | Update a task        |
| DELETE | /api/tasks/:id      | Yes  | Delete a task        |

## Folder Structure

```
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
```
