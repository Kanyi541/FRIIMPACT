# AfriImpact NGO - Premium Website

A world-class, cinematic NGO website built with modern web technologies.

## ✨ Features
- **Admin Dashboard**: Manage site content (projects, news, stats) via `/admin.html`.
- **Firebase Integration**: Real-time database support with Firestore.
- **6 Fully Designed Pages**: Home, About, Projects, News/Events, Donate, and Contact.
- **Cinematic Animations**: Scroll reveals, parallax effects, and animated counters.
- **Premium UI/UX**: Glassmorphism, soft gradients, and high-end humanitarian storytelling.
- **Interactive Components**: AI Chatbot widget, Donation Modal, Scroll Progress, and Floating Socials.
- **Responsive**: Fully optimized for mobile, tablet, and desktop.

## 🛠️ Tech Stack
- **Vite**: Modern frontend tooling.
- **Tailwind CSS**: Utility-first styling.
- **Firebase**: Real-time database (Firestore).
- **JavaScript (Vanilla)**: Clean, scalable logic.
- **Lucide**: Premium stroke icons (via CDN).

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Database Setup**:
   The site uses **LocalStorage** by default (Demo Mode). To use a real database:
   - Create a project at [Firebase Console](https://console.firebase.google.com/).
   - Enable **Cloud Firestore**.
   - Copy your Web App config into `src/firebase-config.js`.

3. **Run Locally**:
   ```bash
   npm run dev
   ```

## 📁 Project Structure
- `/admin.html`: Content Management System.
- `/index.html`, `/about.html`, etc.: Dynamic page templates.
- `/src/db.js`: Database layer (Firebase/LocalStorage).
- `/src/firebase-config.js`: Firebase credentials.
- `/src/style.css`: Core styling.
- `/src/main.js`: Dynamic rendering and site logic.
- `/src/components/layout.js`: Shared UI components (Navbar, Footer, Modals).
