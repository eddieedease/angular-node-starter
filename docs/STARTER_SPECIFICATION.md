# Angular + Node.js + MySQL Starter Template Specification

> **Purpose:** Use this document as the prompt/specification in your next coding session to generate the complete starter template.

---

## 1. Project Overview & Architecture

We are building a production-ready **Full-Stack Starter Template** consisting of:
- **Frontend:** Modern Angular (Latest version) using cutting-edge features.
- **Backend:** Node.js (TypeScript + Express) with JWT Authentication.
- **Database:** MySQL 8.
- **Development Setup:** Local Angular CLI (`ng serve`) with proxying to a local Dockerized backend & database for maximum speed and hot-reloading.

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

### Frontend (Angular)
- **Version:** Latest Angular version.
- **State & Change Detection:** **Zoneless** enabled (`provideZonelessChangeDetection()`), using **Angular Signals** (`signal()`, `computed()`, `effect()`) for reactive state.
- **Syntax:** Built-in Control Flow (`@if`, `@for`, `@switch`) and `@defer` blocks.
- **Architecture:** 
  - 100% **Standalone Components** (no `NgModules`).
  - Functional Routing Guards (`canActivate: [authGuard]`) and Functional HTTP Interceptors (`withInterceptors([authInterceptor])`).
  - Dependency Injection using the `inject()` function.

### Backend (Node.js & MySQL)
- **Runtime:** Node.js with **TypeScript**.
- **Framework:** Express.js (or Fastify).
- **Database:** MySQL 8.
- **ORM / Query Builder:** `Kysely`, `Prisma`, or `TypeORM` / `mysql2` with prepared statements.
- **Security:** JWT (JSON Web Tokens) in HTTP-only cookies or Bearer headers, `bcrypt` for password hashing, CORS configuration, and input validation (Zod/Joi).

### Local Docker Environment
- **`docker-compose.yml`** containing:
  1. `backend`: Node.js container in watch mode (`tsc --watch` or `tsx`).
  2. `db`: MySQL 8 container with persistent volume.
  3. `phpmyadmin`: Container accessible on `http://localhost:8080` for easy database management.
- **Angular Proxy (`proxy.conf.json`):** Routes all `/api/*` calls from `localhost:4200` to `http://localhost:3000`.

---

## 3. Core Template Features

### A. Landing Page (Public)
- Clean, responsive Landing Page accessible at `/`.
- Includes Header navigation (Home, About, Features, Login button), Hero section, and Footer.

### B. Authentication System
- Login page at `/login`.
- JWT-based authentication flow (Login POST endpoint -> Return token -> Store token/session).
- Auto-redirect to `/admin/dashboard` upon successful login.
- **Database Seed:** Automatic seed script on startup that creates a default Admin user:
  - **Email:** `admin@example.com`
  - **Password:** `Admin123!`

### C. Admin Dashboard (Protected)
- Accessible at `/admin` (Protected by `authGuard`).
- Layout with Sidebar, Top Navigation, User profile menu, and Logout button.
- Overview page displaying simulated statistics (e.g., total users, system status) fetched from the Node.js `/api/admin/stats` endpoint.

---

## 4. File Structure Blueprint

```
angular-node-starter/
├── docker-compose.yml
├── README.md
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── config/          # DB connection & env setup
│       ├── controllers/     # Auth & Admin controllers
│       ├── middleware/      # Auth guard & error handling
│       ├── routes/          # Express route definitions
│       ├── seeders/         # Default admin user seed
│       └── index.ts         # Server entry point
└── frontend/
    ├── angular.json
    ├── package.json
    ├── proxy.conf.json      # Angular dev proxy to localhost:3000
    └── src/
        ├── app/
        │   ├── core/        # Auth service, interceptor, guards
        │   ├── features/
        │   │   ├── landing/ # Public landing page component
        │   │   ├── auth/    # Login page component
        │   │   └── admin/   # Admin dashboard & layout
        │   ├── app.config.ts# Zoneless & HTTP client setup
        │   ├── app.routes.ts# Application routes
        │   └── app.component.ts
        └── main.ts
```

---

## 5. Development Command Reference

```bash
# 1. Start Docker Containers (Backend + MySQL + phpMyAdmin)
docker compose up -d

# 2. Start Angular Frontend locally (with Hot Reloading)
cd frontend
npm install
ng serve --proxy-config proxy.conf.json

# 3. Access in Browser
# - Frontend: http://localhost:4200
# - Backend API: http://localhost:3000/api
# - phpMyAdmin: http://localhost:8080
```
