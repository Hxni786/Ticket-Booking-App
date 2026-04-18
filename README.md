# 🎟️ TicketVerse — Premium Ticket Booking Platform

A full-stack, responsive ticket booking platform designed for **Movies**, **Events**, and **Travel**. Engineered with modern web development practices, it features a React-based frontend, and a robust Node.js/Express backend communicating with a MySQL database.

---

## 🏗️ Architecture Stack

TicketVerse follows a standard **3-tier architecture** separating presentation, business logic, and data access:

- **Client Tier (Frontend)**: 
  - **React (Vite)**: Delivers a blazing-fast, component-driven user interface.
  - **Axios**: Manages asynchronous HTTP requests to the backend API.
  - **CSS Modules & Global Vars**: Implements isolated, maintainable, and theme-able styling.
- **Application Tier (Backend)**:
  - **Node.js & Express**: Provides a scalable RESTful API architecture.
  - **MVC Pattern**: Separates endpoint definitions (Routes), business logic (Controllers), and data access (Models).
- **Data Tier (Database)**:
  - **MySQL**: Relational database structuring ticket details, categories, pricing, and dynamic seat availability.

---

## 📁 Project Structure

```
ticket-booking-app/
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar / SearchBar / MovieCard
│   │   ├── pages/
│   │   │   └── Home
│   │   ├── services/
│   │   │   └── api.js      # Axios API calls
│   │   ├── App.jsx / main.jsx
│   │   └── index.css       # Global styles + CSS vars
│   └── vite.config.js
│
├── server/                 # Node.js + Express backend
│   ├── config/
│   │   └── db.js           # MySQL pool connection
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── server.js
│   └── .env.example
│
└── database/
    ├── schema.sql          # Table definitions
    └── seed.sql            # Sample data records
```

---

## ✨ Core Features

- **Dynamic Search & Filtering** — Real-time filtering by title, genre, or description.
- **Categorized Browsing** — Dedicated tabs for Movies, Events, and Travel.
- **Smart Sorting** — Order results by Featured, Rating, Date, or Price.
- **Live Seat Availability** — Visual progress bars with dynamic urgency alerts.
- **Optimized UX** — Skeleton loaders for smooth perceived performance during data fetching.
- **Fully Responsive** — Seamlessly adapts across mobile, tablet, and desktop environments.
- **Resilient Architect** — Graceful error handling with robust fallback mechanisms.

---

## ⚡ Quick Start & Deployment

### 1. Database Initialization
```bash
mysql -u root -p
source database/schema.sql
source database/seed.sql
```

### 2. Environment Configuration
```bash
cp server/.env.example server/.env
# Edit server/.env with your local MySQL credentials
```

### 3. Install Dependencies
```bash
cd ticket-booking-app
npm run install:all
```

### 4. Launch Application
```bash
npm run dev
# Frontend live at → http://localhost:3000
# Backend running at → http://localhost:5000
```

---

## 🌐 API Reference Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/movies` | Retrieve all available tickets |
| GET | `/api/movies/:id` | Fetch specific ticket details by ID |
| GET | `/api/movies/search?q=term` | Query tickets matching title/description |
| GET | `/api/movies/category/:cat` | Filter by category (movie/event/travel) |
| GET | `/api/movies/popular` | Retrieve top-rated tickets |
| GET | `/api/health` | Diagnostic server health check |

---

## 🎨 Design System

Engineered with custom CSS variables supporting a rich dark theme ecosystem. Typography powered by **Syne** (display fonts) and **DM Sans** (body text), complemented by a stunning teal, gold, and violet accent color palette.
