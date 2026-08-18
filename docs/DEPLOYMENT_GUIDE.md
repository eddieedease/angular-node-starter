# Complete Deployment Guide: GitHub, VPS & Coolify

> **Purpose:** Step-by-step instructions to set up GitHub version control, provision a VPS (Hetzner, Contabo, or DigitalOcean), configure Antagonist DNS, install Coolify, and configure automatic Git-push deployments without encountering memory, networking, or proxy errors.

---

## Key Troubleshooting & Lessons Learned (Read First!)

> [!IMPORTANT]
> 1. **VPS Swap File is Mandatory for MySQL 8**: On 2GB/4GB servers, MySQL 8 and Docker compilation spike memory usage. Always create a **4GB Swap File** immediately after server creation to prevent Out-Of-Memory container crashes (exit code 137).
> 2. **Express Host Binding (`0.0.0.0`)**: In Node.js Express, `app.listen(PORT, '0.0.0.0')` must explicitly bind to `0.0.0.0`. If bound to default `localhost`, Traefik reverse proxy receives connection refused (`502 Bad Gateway`).
> 3. **Coolify Internal Database Hostname**: Copy the exact internal container hostname from the **MySQL URL (internal)** field in Coolify (e.g. `mysql://user:pass@CONTAINER_NAME:3306/db`). Do not prepend `mysql-database-` if the internal hostname is just the container UUID.
> 4. **Frontend Nginx Proxying & DNS Resolver**: In `frontend/nginx.conf`, include `resolver 1.1.1.1 8.8.8.8 valid=30s;` and proxy `/api/` calls to `https://api.yourdomain.nl/api/`. This avoids 405 Method Not Allowed and CORS issues.

---

## Step 1: GitHub Repository Setup

### 1.1 Create a GitHub Repository
1. Log in to [GitHub](https://github.com).
2. Click **+** (top right) -> **New repository**.
3. Set **Repository name**: `angular-node-starter`.
4. Select **Private** (recommended).
5. Click **Create repository**.

### 1.2 Push Local Code to GitHub
Open your terminal in your project root directory (`angular-node-starter/`) and run:

```bash
git init
git branch -M main
git add .
git commit -m "feat: initial commit with Angular 21, Node.js, and Docker starter template"
git remote add origin https://github.com/YOUR_USERNAME/angular-node-starter.git
git push -u origin main
```

---

## Step 2: VPS Provisioning & Swap Setup

### 2.1 Order a VPS Server
1. Sign up on **Hetzner Cloud**, **Contabo**, or **DigitalOcean**.
2. Select OS Image: **Ubuntu 24.04 LTS**.
3. Select server plan: **2 GB to 6 GB RAM** (e.g. Hetzner `CAX11` / `CX22`, or Contabo `Cloud VPS 1`).
4. Add your SSH Key and click **Create**.

### 2.2 Add 4GB Swap File (Mandatory)
Connect to your VPS via SSH and run this 1-line command to configure swap memory:

```bash
ssh root@YOUR_SERVER_IP
fallocate -l 4G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
```

---

## Step 3: Antagonist.nl DNS Setup

1. Log in to **Mijn Antagonist**.
2. Go to **Domeinnamen** -> Select your domain (e.g. `easetest.nl`) -> **DNS-beheer**.
3. Add/Update these **A Records**:

| Host / Naam | Type | TTL | Value / Doel-IP |
| :--- | :--- | :--- | :--- |
| *(leave empty)* | `A` | `600` | `YOUR_SERVER_IP` |
| `www` | `A` | `600` | `YOUR_SERVER_IP` |
| `api` | `A` | `600` | `YOUR_SERVER_IP` |

4. Click **Opslaan** (Save).

---

## Step 4: Installing Coolify on the Server

### 4.1 Run the Installer
Paste the official Coolify installation script into your server SSH terminal:

```bash
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

### 4.2 Initial Setup
1. Open `http://YOUR_SERVER_IP:8000` in your browser.
2. Create your **Root Administrator Account**.
3. Complete onboarding by selecting **localhost** as the primary server destination.

---

## Step 5: Resource Deployment in Coolify

### 5.1 Connect GitHub
1. In Coolify left menu, click **Sources** -> **+ Add Source** -> **GitHub App**.
2. Click **Register GitHub App** and authorize access to your `angular-node-starter` repository.

### 5.2 Deploy Database (MySQL 8)
1. Go to **Projects** -> **Default** -> **Production** -> **+ New Resource**.
2. Select **Database** -> **MySQL**.
3. Click **Deploy**.
4. Once running (🟢), copy the internal database hostname from the **MySQL URL (internal)** field (e.g. `xuzkcumlohjyetvhkuynabvy`).

### 5.3 Deploy Backend API (Node.js Express)
1. Click **+ New Resource** -> **GitHub Repository** -> Select `angular-node-starter` (`main` branch).
2. Set **Build Pack**: `Dockerfile`
3. Set **Base Directory**: `/backend`
4. Set **Port**: `3000`
5. Set **Domains**: `https://api.yourdomain.nl`
6. Add **Environment Variables** (Type = **Production**):
   - `PORT`: `3000`
   - `DB_HOST`: *(copied internal MySQL hostname from step 5.2)*
   - `DB_USER`: `root`
   - `DB_PASSWORD`: *(your root password from MySQL page)*
   - `DB_NAME`: `default`
   - `JWT_SECRET`: `super-secret-jwt-key-2026!`
7. Click **Deploy**.

### 5.4 Deploy Frontend UI (Angular 21 + Tailwind)
1. Click **+ New Resource** -> **GitHub Repository** -> Select `angular-node-starter` (`main` branch).
2. Set **Build Pack**: `Dockerfile`
3. Set **Base Directory**: `/frontend`
4. Set **Port**: `80`
5. Set **Domains**: `https://yourdomain.nl, https://www.yourdomain.nl`
6. Click **Deploy**.

---

## Step 6: Verify Automatic CI/CD Pipeline

Whenever you push changes to GitHub:

```bash
git add .
git commit -m "feat: add new feature"
git push origin main
```

Coolify automatically catches the webhook, builds the new Docker images, and updates your live website with zero downtime!
