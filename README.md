# Task Dashboard

A modern full-stack task management dashboard built with **React, Vite, Node.js, Express, Prisma, and PostgreSQL**. The application provides a clean and responsive interface for managing tasks, tracking progress, and handling user authentication with OTP verification.

---

## 🚀 Features

### Authentication & Security

* User signup and login system
* OTP email verification flow
* Password hashing using `bcryptjs`
* JWT-based authentication
* Protected API routes

### Task Management

* Create, update, and delete tasks
* Task status tracking:

  * TODO
  * IN_PROGRESS
  * COMPLETED
* Progress tracking for each task
* Due date management
* Responsive dashboard UI

### Frontend Experience

* Built with React + Vite
* Clean and modern UI
* Toast notifications using `react-hot-toast`
* Client-side routing with `react-router-dom`
* Reusable component-based architecture

### Backend Architecture

* RESTful API with Express.js
* Prisma ORM integration
* PostgreSQL database support
* Modular folder structure
* Email utility integration using Nodemailer

---

# 🛠️ Tech Stack

## Frontend

* React 19
* Vite
* Tailwind CSS
* Axios
* React Router DOM
* Lucide React Icons
* React Hot Toast

## Backend

* Node.js
* Express.js
* Prisma ORM
* PostgreSQL
* JWT Authentication
* Nodemailer
* bcryptjs

---

# 📁 Project Structure

```bash
mini-task-dashboard/
│
├── task-dashboard-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
├── task-dashboard-backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── prisma/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/paridhijain153/TaskFlow
cd mini-task-dashboard
```

---

## 2️⃣ Backend Setup

Navigate to the backend folder:

```bash
cd task-dashboard-backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
DATABASE_URL="your_postgresql_database_url"
DIRECT_URL="your_postgresql_direct_url"
JWT_SECRET="your_jwt_secret"
EMAIL_USER="your_email@example.com"
EMAIL_PASS="your_email_password"
PORT=5000
```

Run Prisma migration:

```bash
npx prisma migrate dev
```

Generate Prisma client:

```bash
npx prisma generate
```

Start the backend server:

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

## 3️⃣ Frontend Setup

Open a new terminal and navigate to frontend:

```bash
cd task-dashboard-frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend server:

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🗄️ Database Schema

## User Model

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
}
```

## OTP Model

```prisma
model OTP {
  id        Int      @id @default(autoincrement())
  email     String
  otp       String
  expiresAt DateTime
  createdAt DateTime @default(now())
}
```

## Task Model

```prisma
model Task {
  id          String      @id @default(uuid())
  title       String
  description String
  status      TaskStatus  @default(TODO)
  progress    Int         @default(0)
  dueDate     DateTime
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}
```

---

# 🔐 Authentication Flow

1. User enters email during signup
2. OTP is sent via email
3. User verifies OTP
4. Account creation is completed
5. JWT token is generated after login
6. Protected routes require valid authentication token

---

# 📡 API Endpoints

## Authentication Routes

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| POST   | `/auth/signup`     | Register new user |
| POST   | `/auth/login`      | User login        |
| POST   | `/auth/send-otp`   | Send OTP email    |
| POST   | `/auth/verify-otp` | Verify OTP        |

## Task Routes

| Method | Endpoint     | Description     |
| ------ | ------------ | --------------- |
| GET    | `/tasks`     | Get all tasks   |
| POST   | `/tasks`     | Create new task |
| PUT    | `/tasks/:id` | Update task     |
| DELETE | `/tasks/:id` | Delete task     |

---

# 🧪 Available Scripts

## Backend

```bash
npm run dev     # Start development server
npm start       # Start production server
```

## Frontend

```bash
npm run dev       # Start Vite development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

---

# 🌟 Future Improvements

* Task filtering and sorting
* Drag-and-drop Kanban board
* User profile management
* Team collaboration support
* Real-time notifications
* Dark mode support
* Task analytics dashboard
* File upload support

---

# 📸 Screenshots

## Login Page

![Login Page](./screenshots/login-page.png)

## Dashboard Overview

![Dashboard](./screenshots/dashboard.png)

## Task Board

![Task Board](./screenshots/task-board.png)

---

# 🌐 Live Demo

## Frontend Deployment

* Live App: [https://task-flow-three-ecru.vercel.app/](https://task-flow-three-ecru.vercel.app/)

## Backend Deployment

* API Server: [https://taskflow-dy5l.onrender.com](https://taskflow-dy5l.onrender.com)

## GitHub Repository

* Repository: [https://github.com/paridhijain153/TaskFlow](https://github.com/paridhijain153/TaskFlow)

---

# 🚀 Deployment

## Frontend Deployment

You can deploy the frontend using:

* Vercel
* Netlify
* Firebase Hosting

## Backend Deployment

You can deploy the backend using:

* Render
* Railway
* Cyclic
* AWS EC2

## Database Hosting

Recommended PostgreSQL providers:

* Neon
* Supabase
* Railway

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

Developed by **Paridhi Jain**

If you found this project useful, consider giving it a ⭐ on GitHub.
