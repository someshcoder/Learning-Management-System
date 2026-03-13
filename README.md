# Learning Management System (LMS)

<p align="center">
  <img src="./client/public/LMS-logo.png" alt="LMS-Logo" width="200" height="200">
</p>

<div align="center">

> A modern full-stack Learning Management System built with **React + Vite** (frontend) and **Node.js + Express + MongoDB** (backend).

---

## 📌 Table of Contents

- Features
- Tech Stack
- Getting Started
- Project Structure
- API Endpoints
- Troubleshooting
- Contributing
- License

---

## ✨ Features

✅ **Authentication & Authorization**
- Signup/login with JWT + secure routes
- Role-based access (student vs instructor/admin)

✅ **Course Management**
- Create, edit, delete courses
- Add lectures (video + file uploads) + course outline
- Browse catalog with course details

✅ **Payment Flow**
- Razorpay integration for checkout
- Order creation + webhook handling

✅ **Rich UI**
- Responsive layout
- Modern styling (Tailwind CSS)
- Client-side validation + toasts

---

## 🧰 Tech Stack

| Frontend | Backend | Database | Payments |
|--------|---------|----------|----------|
| React + Vite | Node.js + Express | MongoDB (Mongoose) | Razorpay |
| Tailwind CSS | JWT Auth | Multer (file upload) | Cookies + CORS |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (>= 18)
- npm
- MongoDB (local or Atlas)


### Install

```bash
# Clone
git clone https://github.com/<your-username>/<your-repo>.git
cd L-master

# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### Environment Variables

Create a `.env` file in the `server/` folder with your configuration:

```env
PORT=3000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>

# Razorpay
keyId=<your-razorpay-key_id>
Secertkey=<your-razorpay-key_secret>
RAZORPAY_WEBHOOK_SECRET=<your-webhook-secret>
```

> ✅ Tip: Use a `.env.example` in git to share variable names safely.

### Run Locally

Open **two terminals**:

```bash
# Terminal 1 (backend)
cd server
npm run dev
```

```bash
# Terminal 2 (frontend)
cd client
npm run dev
```

Then open: **http://localhost:5173**

---

## 🧱 Project Structure

```
L-master/
├─ client/              # React + Vite frontend
│  ├─ src/
│  ├─ public/
│  ├─ package.json
│  └─ ...
├─ server/              # Express API + MongoDB backend
│  ├─ controller/       # Route handlers
│  ├─ middleware/       # Auth + validation
│  ├─ model/            # Mongoose schemas
│  ├─ routes/           # Express routers
│  ├─ uploads/          # Uploaded files
│  ├─ index.js
│  └─ package.json
└─ README.md
```

---

## 📡 API Endpoints (Overview)

### Auth
- `POST /api/v1/user/register` — Register user
- `POST /api/v1/user/login` — Login user

### Courses
- `GET /api/v1/course` — List courses
- `POST /api/v1/course` — Create course (instructor)
- `PUT /api/v1/course/:id` — Update course
- `DELETE /api/v1/course/:id` — Delete course

### Lectures
- `POST /api/v1/lecture` — Add lecture
- `GET /api/v1/lecture/:courseId` — Get lectures by course

### Purchase / Payments
- `POST /api/v1/purchase/create` — Create Razorpay order
- `POST /api/v1/purchase/webhook` — Razorpay webhook handler

> 🔐 Most routes require authentication; use `Authorization: Bearer <token>`.

---

## 🛠️ Troubleshooting

- If `nodemon` is not recognized, run `npm install` inside `server/`.
- If MongoDB fails to connect, verify `MONGO_URI` and that MongoDB is running.
- For Razorpay errors, confirm `keyId` / `Secertkey` match your dashboard values.
- If you see CORS issues, make sure frontend is running on `http://localhost:5173`.

---

## 🤝 Contributing

Contributions are welcome! You can:

- Add new features (e.g., course ratings, quizzes)
- Improve UI/UX (accessibility, responsive design)
- Add tests (unit/integration)

1. Fork the repo
2. Create a feature branch
3. Submit a pull request

---

## 📄 License

This project is open-source. Use it, modify it, and share it.
