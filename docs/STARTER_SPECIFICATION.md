# Angular + Node.js + MySQL Starter Template Specification

> **Purpose:** Detailed architectural specification for the Angular 21 (Zoneless + Signals + Tailwind CSS), Express TypeScript, and MySQL 8 full-stack starter template.

---

## 1. Project Overview & Architecture

We are building a production-ready **Full-Stack Starter Template** consisting of:
- **Frontend:** Modern Angular 21 with Tailwind CSS, Zoneless change detection, and Angular Signals.
- **Backend:** Node.js (TypeScript + Express) with JWT Authentication.
- **Database:** MySQL 8.
- **Development Setup:** Local Angular CLI (`ng serve`) with proxying (`proxy.conf.json`) to local Dockerized backend & database for maximum speed and hot-reloading.

```
+------------------------------------------------------------------------+
|                          LOCAL DEVELOPMENT                             |
|                                                                        |
|  +--------------------------+       proxy.conf.json                    |
|  | Angular CLI (ng serve)   | -------------------------\               |
|  | http://localhost:4200    |                          |               |
|  +--------------------------+                          v               |
|                                            +------------------------+  |
|                                            | Docker Compose         |  |
|                                            |                        |  |
|                                            | - Node.js API (:3000)  |  |
|                                            | - MySQL Database (:3306)| |
|                                            | - phpMyAdmin (:8080)   |  |
|                                            +------------------------+  |
+------------------------------------------------------------------------+
```

---

## 2. Technical Requirements

### Frontend (Angular 21 + Tailwind CSS)
- **Version:** Angular 21.
- **Styling:** **Tailwind CSS v4** (`@use "tailwindcss";` in `styles.scss` with `@tailwindcss/postcss`).
- **State & Change Detection:** **Zoneless** enabled (`provideZonelessChangeDetection()`), using **Angular Signals** (`signal()`, `computed()`) for reactive state.
- **Syntax:** Built-in Control Flow (`@if`, `@for`, `@switch`) and `@defer` blocks.
- **Architecture:** 
  - 100% **Standalone Components** (no `NgModules`).
  - Functional Routing Guards (`canActivate: [authGuard]`) and Functional HTTP Interceptors (`withInterceptors([authInterceptor])`).
  - Dependency Injection using the `inject()` function.

### Backend (Node.js & MySQL)
- **Runtime:** Node.js 22 with **TypeScript**.
- **Framework:** Express.js.
- **Database:** MySQL 8.
- **Query Builder / Connection:** `mysql2/promise` connection pool with auto-reconnect retry logic.
- **Security:** JWT (JSON Web Tokens) in HTTP-only cookies or Bearer headers, `bcryptjs` for password hashing, CORS configuration, and Zod schema validation.

### Local Docker Environment
- **`docker-compose.yml`** containing:
  1. `backend`: Node.js container running `tsx watch` on port `3000`.
  2. `db`: MySQL 8 container with persistent volume `mysql_data` on port `3306`.
  3. `phpmyadmin`: GUI container on port `8080`.
- **Angular Proxy (`proxy.conf.json`):** Routes all `/api/*` calls from `localhost:4200` to `http://localhost:3000`.

---

## 3. Core Template Features

### A. Landing Page (Public)
- Clean, responsive Landing Page accessible at `/`.
- Includes Header navigation, Hero section, Feature grid, Tech stack cards, Architecture diagram, and Footer.

### B. Authentication System
- Login page at `/login`.
- JWT-based authentication flow (Login POST endpoint -> Return token -> Store token/session).
- Quick-fill button for default seeded admin credentials.
- Auto-redirect to `/admin/dashboard` upon successful login.
- **Database Seed:** Automatic seed script on startup that creates default Admin user:
  - **Email:** `admin@example.com`
  - **Password:** `Admin123!`

### C. Admin Dashboard (Protected)
- Accessible at `/admin` (Protected by `authGuard`).
- Layout with Sidebar, Topbar, User profile avatar, and Logout button.
- Real-time telemetry page displaying live statistics (total users, system status, uptime, RAM) fetched from `/api/admin/stats`.

---

## 4. File Structure Blueprint

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
│       ├── config/          # DB connection & retry setup
│       ├── controllers/     # Auth & Admin controllers
│       ├── middleware/      # Auth guard & error handling
│       ├── routes/          # Express route definitions
│       ├── seeders/         # Default admin user seed
│       └── index.ts         # Server entry point
└── frontend/
    ├── angular.json
    ├── package.json
    ├── proxy.conf.json      # Angular dev proxy to localhost:3000
    ├── .postcssrc.json      # Tailwind PostCSS configuration
    └── src/
        ├── styles.scss      # Tailwind CSS import
        └── app/
            ├── core/        # Auth service, interceptor, guards
            ├── features/
            │   ├── landing/ # Public landing page component
            │   ├── auth/    # Login page component
            │   └── admin/   # Admin dashboard & layout
            ├── app.config.ts# Zoneless & HTTP client setup
            └── app.routes.ts# Application routes
```

---

## 5. Development Command Reference

```bash
# 1. Start Docker Containers (Backend + MySQL + phpMyAdmin)
docker compose up -d

# 2. Start Angular Frontend locally (with Hot Reloading & Tailwind CSS)
cd frontend
npm install
npm start

# 3. Access in Browser
# - Frontend: http://localhost:4200
# - Backend API: http://localhost:3000/api
# - phpMyAdmin: http://localhost:8080
```
