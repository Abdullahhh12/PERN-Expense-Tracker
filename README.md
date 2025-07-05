# 💰 PERN Expense Tracker

A full-stack expense tracking application built with the PERN stack:

- **PostgreSQL** – Neon (cloud database)
- **Express.js** – Backend REST API
- **React.js** – Vite-powered frontend UI
- **Node.js** – Runtime environment

---

## 🌐 Live URLs

- **Frontend (Vercel):** https://pern-expense-tracker.vercel.app  
- **Backend (Render):** https://your-backend-name.onrender.com

---

## 🔐 Authentication & Authorization

This app uses **JWT (JSON Web Tokens)** for secure authentication and authorization.

### 🔑 Features:
- **User Registration & Login**:
  - On registration or login, a **JWT token** is generated and sent to the frontend.
  - The token is stored in `localStorage` for persistent sessions.
  
- **Authorization**:
  - Every protected route checks for a valid JWT in the request headers.
  - Unauthorized users cannot access or manipulate transaction data.
  
- **Axios Interceptor**:
  - The frontend uses an Axios instance that automatically adds the `Authorization: Bearer <token>` header to all API requests.

---

## 🧠 Database (PostgreSQL)

The app uses **PostgreSQL**, hosted on **Neon**, to store all data including:

- User credentials (securely hashed)
- Transactions: amount, type (income/expense), category, date, user ID reference

Tables include relationships between users and their transactions using foreign keys.

---

## ⚙️ Local Development

### 🛠 Backend Setup
cd backend
npm install

Create a .env file in backend/

DATABASE_URL=your_neon_connection_url
JWT_SECRET=your_jwt_secret_key
PORT=5000

node src/server.js

### 🛠 Frontend Setup
cd frontend
npm install

npm run dev
