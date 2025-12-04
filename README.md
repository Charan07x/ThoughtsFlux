# 🚀 ThoughtsFlux

A modern full-stack blogging platform built with **Vite + React + TypeScript**, **Drizzle ORM**, and **Node.js**, featuring authentication, a clean UI, and a smooth writing experience.

## ✨ Features

* 🔐 **User Authentication** (Replit Auth or custom auth util)
* 📝 **Write, edit, and publish blog posts**
* 🎨 **Beautiful UI components** (ShadCN UI + TailwindCSS)
* 🌗 **Dark/Light Theme Toggle**
* ⚡ **Fast frontend** using Vite + React Query
* 🗄️ **Drizzle ORM database layer**
* 🧩 Modular server with routes + static serving
* 📱 **Responsive Layout**

---

## 📁 Project Structure

```
ThoughtsFlux/
│
├── client/               # Frontend (React + TS + Vite)
│   ├── src/components/   # UI + custom components
│   ├── src/pages/        # App pages
│   └── main.tsx
│
├── server/               # Backend (Node + Express-like server)
│   ├── db.ts             # Drizzle DB config
│   ├── routes.ts         # API routes
│   └── replitAuth.ts     # Auth utilities
│
├── shared/               # Shared types & schema
├── drizzle.config.ts     # ORM config
├── vite.config.ts        # Vite config
└── package.json
```

---

## 🛠️ Installation

### 1️⃣ Clone the repo

```sh
git clone https://github.com/Charan07x/ThoughtsFlux
cd ThoughtsFlux
```

### 2️⃣ Install dependencies

```sh
npm install
```

### 3️⃣ Start development mode

#### Start frontend:

```sh
cd client
npm install
npm run dev
```

#### Start backend:

```sh
cd server
npm install
npm run dev
```

---

## 🗄️ Database (Drizzle ORM)

Configure your database in:

```
server/db.ts
drizzle.config.ts
```

Then push schema:

```sh
npx drizzle-kit push
```

---

## 🚀 Deployment Options (Best Choices)

### ✔ **1. Vercel (Best for Frontend)**

* Easily deploy the **client** folder
* Fast, free, zero-config

### ✔ **2. Render (Best for Full-Stack)**

Deploy:

* **Frontend** → static site
* **Backend** → Node web service

Free tier works well.

### ✔ **3. Replit Deployment**

Since this project originated in Replit, you can deploy both client + server inside one Repl, but may require config tweaks.

---

## 🤝 Contributing

Contributions are welcome!
Feel free to open issues or submit pull requests.

---

## 📄 License

This project is licensed under the MIT License.

---

## ⭐ Show Support

If you like this project, give the repo a star ⭐ on GitHub!
