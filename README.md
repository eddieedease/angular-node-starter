# Angular + Node.js + MySQL Starter Template

A modern, production-ready full-stack template featuring **Angular 21** (Zoneless + Signals + Tailwind CSS), **Node.js (TypeScript + Express)**, **MySQL 8**, and **Docker Compose**.

## Features

- **Frontend (Angular 21 + Tailwind CSS v4)**
  - Integrated Tailwind CSS styling system (`@use "tailwindcss";`)
  - Standalone Components & Built-in Control Flow (`@if`, `@for`, `@switch`)
  - Zoneless Change Detection (`provideZonelessChangeDetection()`)
  - Reactive state management with Angular **Signals** (`signal()`, `computed()`)
  - Functional Router Guards (`authGuard`) & HTTP Interceptors (`authInterceptor`)
  - Multi-stage Dockerfile with Nginx SPA fallback routing & DNS proxying

- **Backend (Node.js + Express + TypeScript)**
  - Express API with explicit `0.0.0.0` host binding for Docker/Traefik reverse proxies
  - JWT Authentication with bcrypt password hashing
  - Auto-seeding database schema and initial admin account on container boot
  - Input validation with Zod
  - MySQL connection pool via `mysql2/promise` with auto-reconnect retry logic
  - Clean modular architecture (Controllers, Middleware, Routes, Seeders)

- **Database & Local GUI**
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

### 2. Start Angular Frontend (with Hot Reloading)

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

## Production Deployment & Documentation

For complete production deployment instructions using VPS (Hetzner, Contabo, DigitalOcean), Antagonist DNS, and Coolify, see:

📖 **[Deployment Guide](docs/DEPLOYMENT_GUIDE.md)**
📋 **[Starter Specification](docs/STARTER_SPECIFICATION.md)**
