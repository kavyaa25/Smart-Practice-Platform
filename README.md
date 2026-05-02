# 🚀 Smart Practice Platform

A full-stack web application for practicing listening and writing skills with AI-powered feedback.

![Smart Practice Platform](https://img.shields.io/badge/React-18.2-blue) ![Node.js](https://img.shields.io/badge/Node.js-20-green) ![MongoDB](https://img.shields.io/badge/MongoDB-9.5-brightgreen) ![Tailwind](https://img.shields.io/badge/Tailwind-4.2-38B2AC)

---

<p align="center">
  <b>Practice Listening & Writing with Intelligent Automated Feedback</b><br/>
  <i>Full-Stack MERN Application | Internship Project | Production Ready</i>
</p>

---

## 🎯 What Problem Does It Solve?

Many learners struggle to get **instant feedback** on their listening and writing skills.
This platform solves that by providing:

* ⚡ Immediate evaluation
* 📊 Performance tracking
* 🎯 Structured practice system

---

## ✨ Features

* 🎧 **Audio Practice** – Transcribe audio with similarity scoring
* ✍️ **Writing Practice** – Get evaluated on grammar, structure & relevance
* 📊 **Dashboard Analytics** – Track progress with charts
* 🔐 **JWT Authentication** – Secure login/register system
* 🌙 **Dark Mode** – Clean and modern UI
* 📱 **Responsive Design** – Works across all devices
* ⚡ **Real-Time Feedback** – Instant scoring system

---

## 🧠 Smart Evaluation Engine

This project simulates **AI-like feedback** using algorithmic logic:

### 🔍 Core Logic:

* **Levenshtein Distance** → Text similarity
* **Word Matching** → Accuracy check
* **Grammar Validation** → Basic correctness
* **Keyword Detection** → Content relevance

### 📊 Formula:

```text
Similarity % = ((Max Length - Distance) / Max Length) * 100
```

👉 Note: This is a **rule-based intelligent system**, not a real ML model, but designed to mimic AI evaluation.

---

## 🏗️ Tech Stack

### 💻 Frontend

* React 18 + Vite
* Tailwind CSS
* React Router
* Recharts

### ⚙️ Backend

* Node.js + Express
* MongoDB + Mongoose
* JWT Authentication
* Bcrypt

---

## 🏛️ Architecture

```text
Frontend (React)
   ↓
REST API (Node.js + Express)
   ↓
Database (MongoDB)
```

---

## 🔄 Application Flow

```text
Register → Login → Dashboard → Practice → Submit → Evaluation → Feedback → Track Progress
```

---

## 📁 Project Structure

```text
smart-practice-platform/
│
├── client/        # React Frontend
│   ├── components/
│   ├── pages/
│   ├── context/
│
├── server/        # Node.js Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 🔹 Backend

```bash
cd server
npm install
```

Create `.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/smartpractice
JWT_SECRET=your_secret_key
PORT=5000
```

```bash
npm run seed
npm run dev
```

---

### 🔹 Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🔐 Authentication Flow

* Passwords hashed using **bcrypt**
* JWT token issued on login
* Protected routes via middleware

---

## 📊 Dashboard Metrics

* Total Attempts
* Average Score
* Highest Score
* Streak Tracking

---

## 🛡️ Security Highlights

* JWT-based authentication
* Encrypted passwords
* Input validation
* CORS handling
* Rate limiting

---

## 🚀 Deployment

| Layer    | Platform      |
| -------- | ------------- |
| Frontend | Vercel        |
| Backend  | Render        |
| Database | MongoDB Atlas |

---

## ⚠️ Limitations

* Not using real AI/ML models
* Basic grammar evaluation
* No speech-to-text

---

## 🔮 Future Improvements

* 🤖 Real AI/NLP integration
* 🎙️ Speech-to-text support
* 🧠 Advanced grammar correction
* 🏆 Leaderboards & gamification

---

## 👩‍💻 Author

**Kavya D M**
Full-Stack Developer

---

## 💼 Why This Project Stands Out

✔ Full-stack architecture
✔ Real-world problem solving
✔ Algorithm-based evaluation logic
✔ Clean UI/UX with responsive design
✔ Production-ready codebase

---

## ⭐ Show Your Support

If you like this project:

* ⭐ Star the repo
* 🍴 Fork it
* 📢 Share it

---

🔥 **Pro Tip for You (Important):**
Before uploading:

* Add **real screenshots**
* Add **live demo links**
* Pin this repo on GitHub

---

If you want next level 🔥
I can:

* Turn this into a **portfolio case study (top 1%)**
* Add **GitHub badges + animations**
* Prepare **HR explanation using this README**
