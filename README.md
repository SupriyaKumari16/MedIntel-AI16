# 🩺 MedIntel AI

An AI-powered healthcare platform built with the **MERN stack** that helps patients analyze symptoms, upload medical reports, book consultations, and connect with doctors through real-time video calls.

---

## 🚀 Live Demo

🔗 **Frontend:** https://med-intel-ai-16.vercel.app

---

## 📌 Key Features

### 👤 Patient Features

- AI symptom analysis
- AI final report analysis
- Upload medical reports (PDF/JPG/PNG)
- Real-time risk detection (LOW / MEDIUM / HIGH)
- Book doctor appointments
- Join video consultations
- Download prescriptions
- Chat with AI assistant

### 🩺 Doctor Features

- Secure doctor login
- View patient cases
- Access uploaded reports
- Review vitals and AI analysis
- Start video calls
- Generate prescriptions
- Complete consultations

---

## 🧠 AI Workflow

Patient enters symptoms  
↓  
Initial AI Analysis  
↓  
Recommended medical tests  
↓  
Patient uploads reports  
↓  
Final AI Analysis  
↓  
Risk classification  
↓  
Doctor consultation  
↓  
Prescription generation

---

## 🛠️ Tech Stack

### Frontend

- React + Vite
- Tailwind CSS
- Framer Motion
- GSAP
- Axios
- React Router

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Socket.IO
- WebRTC

### AI

- Google Gemini API

---

## 📂 Project Structure

```text
medintel/
├── src/              # Frontend (React + Vite)
├── backend/          # Backend (Node.js + Express)
├── public/           # Static assets
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/SupriyaKumari16/MedIntel-AI16.git
cd MedIntel-AI16
```

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file in the backend folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

---

## 🎯 Highlights

- Full-stack MERN application
- AI-integrated healthcare workflow
- Real-time communication
- JWT-based authentication
- Responsive UI
- Production deployment

---## Deployment

MedIntel is deployed using Vercel with SPA routing support.

## 👩‍💻 Author

**Supriya Kumari**

- GitHub: https://github.com/SupriyaKumari16
- LinkedIn: https://www.linkedin.com/in/supriya-kumari16/

---

⭐ If you found this project useful, consider giving it a star!
