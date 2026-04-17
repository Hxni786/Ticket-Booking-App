# 🎟️ TicketVerse — Ticket Booking App

A full-stack ticket booking web app for **Movies**, **Events**, and **Travel**, built with React + Vite (frontend) and Node.js + Express + MySQL (backend).

---

## 📁 Project Structure

```
ticket-booking-app/
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx / Navbar.module.css
│   │   │   ├── SearchBar.jsx / SearchBar.module.css
│   │   │   └── MovieCard.jsx / MovieCard.module.css
│   │   ├── pages/
│   │   │   └── Home.jsx / Home.module.css
│   │   ├── services/
│   │   │   └── api.js          # Axios API calls
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css           # Global styles + CSS vars
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                 # Node.js + Express backend
│   ├── config/
│   │   └── db.js               # MySQL pool connection
│   ├── controllers/
│   │   └── movieController.js
│   ├── routes/
│   │   └── movieRoutes.js
│   ├── models/
│   │   └── movieModel.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
├── database/
│   ├── schema.sql              # Table definitions
│   └── seed.sql                # 13 sample records
│
└── package.json                # Root with `npm run dev` (runs both)
```

---

## ⚡ Quick Start

### 1. Database Setup
```bash
mysql -u root -p
source database/schema.sql
source database/seed.sql
```

### 2. Configure Environment
```bash
cp server/.env.example server/.env
# Edit server/.env with your MySQL credentials
```

### 3. Install Dependencies
```bash
npm run install:all
```

### 4. Run the App
```bash
npm run dev
# Frontend → http://localhost:3000
# Backend  → http://localhost:5000
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/movies` | Get all tickets |
| GET | `/api/movies/:id` | Get by ID |
| GET | `/api/movies/search?q=term` | Search by title |
| GET | `/api/movies/category/:cat` | Filter: movie / event / travel |
| GET | `/api/movies/popular` | Top-rated tickets |
| GET | `/api/health` | Server health check |

---

## ✨ Features

- **Search** — real-time filtering by title, genre, description
- **Category Tabs** — All / Movies / Events / Travel
- **Sort** — by Featured, Rating, Date, Price
- **Seat Availability** — progress bar with urgency alert
- **Skeleton Loading** — smooth UX while data loads
- **Responsive** — works on mobile, tablet, desktop
- **Error Handling** — graceful fallback with retry button

---

## 🎨 Design System

Custom CSS variables with dark theme, Syne (display) + DM Sans (body), teal/gold/violet accent palette.
