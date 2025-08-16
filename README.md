# 📚 Library Management System

A **full-stack Library Management System** built with **React, Redux
Toolkit Query, Tailwind CSS (with DaisyUI)** on the frontend and
**Node.js, Express.js, TypeScript, and MongoDB (Mongoose)** on the
backend.\
The system allows managing books, borrowing records, and summaries in a
modular and scalable way.

---

## 🚀 Features

### 🔹 Book Management

- Add, update, delete, and list books.
- Auto-availability check: if copies reach `0`, the book is marked
  unavailable.
- filtering, and sorting support for book listings.

### 🔹 Borrow Management

- Borrow books with validation (cannot exceed available copies).
- Tracks due dates and borrowed quantity.
- Borrow summary page with aggregation pipeline (total borrowed per
  book).

### 🔹 Business Logic

- **Copies Validation**: Borrowed quantity deducted from total copies.
- **Availability**: Automatically updates if copies reach `0`.
- **CRUD Support**: Complete operations for both books and borrows.

### 🔹 Additional Features

- Consistent error handling with friendly messages.
- Protected routes with authentication middleware (optional).
- Frontend notifications with **react-hot-toast**.
- Modern UI using **Tailwind CSS + DaisyUI**.

---

## 🛠️ Tech Stack

### Frontend

- ⚛️ React (with TypeScript)
- 🎯 Redux Toolkit Query (RTK Query) -- API state management
- 🎨 Tailwind CSS + DaisyUI -- UI framework
- 🔔 react-hot-toast -- notifications

### Backend

- 🟢 Node.js + Express.js (with TypeScript)
- 🍃 MongoDB + Mongoose -- Database
- ✅ Zod -- schema validation
- 🔒 JWT Middleware -- authentication (optional)

---
