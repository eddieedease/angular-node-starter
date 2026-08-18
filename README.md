# Angular + Node.js + MySQL Starter Template

A modern, production-ready full-stack template featuring **Angular 21** (Zoneless + Signals), **Node.js (TypeScript + Express)**, **MySQL 8**, and **Docker Compose**.

## Features

- **Frontend (Angular 21)**
  - Standalone Components & Built-in Control Flow (`@if`, `@for`, `@switch`)
  - Zoneless Change Detection (`provideZonelessChangeDetection()`)
  - Reactive state management with Angular **Signals** (`signal()`, `computed()`)
  - Functional Router Guards (`authGuard`) & HTTP Interceptors (`authInterceptor`)
  - Angular Dev Proxy setup (`proxy.conf.json`)

- **Backend (Node.js + Express + TypeScript)**
  - JWT Authentication with bcrypt password hashing
  - Auto-seeding database schema and initial admin account on container boot
  - Input validation with Zod
  - MySQL connection pool via `mysql2/promise` with auto-reconnect retry logic
  - Clean modular architecture (Controllers, Middleware, Routes, Seeders)

- **Database & Management**
  - **MySQL 8.0** with persistent storage volume
  - **phpMyAdmin** dashboard running on `http://localhost:8080`

---

## Quick Start (Local Development)

### 1. Start Docker Stack (Backend + Database + phpMyAdmin)

```bash
docker compose up -d --build
```

- **Backend API:** `http://localhost:3000/api`
- **phpMyAdmin:** `http://localhost:8080` (Server: `db`, Username: `root`, Password: `secret`)

### 2. Start Angular Frontend

```bash
cd frontend
npm install
npm start
```

- **Frontend UI:** `http://localhost:4200`

---

## Default Admin Credentials

Upon initial backend startup, the database is seeded automatically with:

- **Email:** `admin@example.com`
- **Password:** `Admin123!`

---

## Environment Variables

### Backend (`backend/.env`)
```env
PORT=3000
DB_HOST=db # Use 'localhost' when running Node outside Docker
DB_USER=root
DB_PASSWORD=secret
DB_NAME=starter_db
JWT_SECRET=super-secret-jwt-key
```

---

## Repository Structure

```
angular-node-starter/
├── docker-compose.yml
├── README.md
├── docs/
│   ├── STARTER_SPECIFICATION.md
│   └── DEPLOYMENT_GUIDE.md
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── routes/
│       ├── seeders/
│       └── index.ts
└── frontend/
    ├── angular.json
    ├── package.json
    ├── proxy.conf.json
    └── src/
        └── app/
            ├── core/
            └── features/
```
