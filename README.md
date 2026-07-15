# 🚀 SkillForge - Empowering the Next Generation of Tech Leaders

Welcome to **SkillForge**, a production-ready Full-Stack Educational Platform. SkillForge bridges the gap between academic theory and practical industry demands by offering high-quality, project-centric courses in Web Development, Digital Marketing, Video Editing, and more.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg?style=for-the-badge)](https://skillforge-orpin.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-black.svg?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)

---

## 🌟 Key Features

- **🔐 Robust Authentication & Security:** 
  - JWT/Session-based authentication powered by `better-auth`.
  - Next.js Proxy/Middleware protection for private routes (e.g., Dashboard, Add/Edit Course).
  - Secure API endpoints with Ownership Authorization (Instructors can only edit/delete their own courses).
- **📊 Interactive Analytics Dashboard:**
  - Dynamic `Recharts` integration showing real-time **Course Pricing Analysis** across published courses.
- **🔍 Advanced Search, Filter & Sort:**
  - Real-time MongoDB aggregation for searching courses by title, filtering by category/level, and sorting by Newest, Oldest, or Price (Low to High / High to Low).
- **🎨 Premium UI/UX:**
  - Built with Tailwind CSS and NextUI/HeroUI for a sleek, modern, and accessible design.
  - Pro-level animations, interactive hover states, glassmorphism, and responsive layouts across all devices.
  - Custom global route loading animations (`loading.tsx`) and beautiful Skeleton Loaders.
- **📚 Course Management:**
  - Full CRUD functionality for Instructors. Add, View, Edit, and Delete courses directly from the user-friendly Dashboard.
- **💡 Real-world Integrations:**
  - Simulated student reviews, automated category-based "Related Courses" suggestions, and completely dynamic routing.

---

## 🛠️ Technology Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | Next.js 16 (App Router), React, TypeScript |
| **Styling** | Tailwind CSS, HeroUI, React Icons |
| **Backend** | Next.js API Routes (Serverless Functions) |
| **Database** | MongoDB (Native Driver) |
| **Authentication** | Better-Auth (MongoDB Adapter & JWT Plugin) |
| **Data Visualization**| Recharts |
| **Deployment** | Vercel |

---

## ⚙️ Local Setup & Installation

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mosharof-dev/skillforge.git
   cd skillforge
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   BETTER_AUTH_SECRET=your_super_secret_string
   BETTER_AUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=optional_google_client_id
   GOOGLE_CLIENT_SECRET=optional_google_client_secret
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000` to see the application in action.

---

## 🔐 Demo Credentials

For quick access to the Instructor Dashboard, you can use the following demo account (or click the "Load Demo Credentials" button on the login page):

- **Email:** `mosharof.dev@gmail.com`
- **Password:** `Pa$$w0rd!`

---

## 👨‍💻 Author

Developed with ❤️ by ** Mosharof**

- GitHub: [@mosharof-dev](https://github.com/mosharof-dev)
- Email: [mosharof.dev@gmail.com](mailto:mosharof.dev@gmail.com)
