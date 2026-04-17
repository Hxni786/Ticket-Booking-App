<div align="center">
  <img src="mobile/assets/icon.png" width="150" alt="TicketVerse Logo" />
  <h1>TicketVerse</h1>
  <p><strong>A Premium Full-Stack Mobile Booking Experience</strong></p>
</div>

---

## 🎬 About TicketVerse

TicketVerse is a state-of-the-art mobile application designed to completely modernize the way you discover and book tickets for Movies, Events, and Travel. 

Built using a powerful **React Native / Expo** frontend and a blazingly fast **Node.js + Express + MySQL** backend, TicketVerse boasts a 100% dark mode, ultra-premium glassmorphism design.

## 📸 Premium Interface Showcases

<div align="center">
  <img src="mobile/assets/promo1.png" width="100%" alt="TicketVerse Home Screen" />
  <p><em>The intuitive, glowing 2-column discovery grid.</em></p>
</div>

<br/>

<div align="center">
  <img src="mobile/assets/promo2.png" width="100%" alt="TicketVerse Details Screen" />
  <p><em>The cinematic details screen featuring parallax scrolling and glassmorphism cards.</em></p>
</div>

## ✨ Key Technical Features

*   **Cinematic "Stitch & Skills" UI:** Highly polished user interface with custom animations, blurred glassmorphism cards, and a sophisticated color palette (`#0a0a0f` deep darks with neon teal and gold accents).
*   **Parallax & Gesture Animations:** Smooth, 60fps native animations using `Animated.ScrollView` and `useNativeDriver`.
*   **Interactive Success Modals:** Satisfying visual feedback loop when completing a booking.
*   **Zero-Duplicate Architecture:** Optimized SQL queries (`MIN(id)` grouping) ensures the grid remains perfectly clean.
*   **Cross-Platform Ready:** Native-bridge stabilized configurations (`expo-status-bar`, `react-native-safe-area-context`) for flawless Android and iOS compilation.

## 🚀 Getting Started

### 1. The Backend (Server)
```bash
cd server
npm install
npm start
```
*Ensure you have MySQL running with the database populated via `database/schema.sql` and `database/seed.sql`.*

### 2. The Mobile App (Expo)
```bash
cd mobile
npm install
npx expo start
```
*Use the Expo Go app on your phone to scan the QR code and experience the app, or download the compiled `.apk` release!*

---
<div align="center">
  <p>Built with ❤️ using React Native, Expo, Node.js & MySQL</p>
</div>
