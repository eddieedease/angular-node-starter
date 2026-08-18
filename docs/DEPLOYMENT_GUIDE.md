# Complete Deployment Guide: GitHub, VPS & Coolify

> **Purpose:** Step-by-step instructions to set up GitHub version control, provision a VPS (Hetzner, Contabo, or DigitalOcean), configure Antagonist DNS, install Coolify, and configure automatic Git-push deployments.

---

## Step 1: GitHub Repository Setup

### 1.1 Create a GitHub Repository
1. Log in to [GitHub](https://github.com).
2. Click **+** (top right) -> **New repository**.
3. Set **Repository name**: `angular-node-starter`.
4. Select **Private** (recommended).
5. Leave "Add a README file" unchecked.
6. Click **Create repository**.

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

## Step 2: Ordering VPS & Antagonist DNS Setup

### 2.1 Order a VPS Server
1. Sign up on **Hetzner Cloud**, **Contabo**, or **DigitalOcean**.
2. Select an OS Image: **Ubuntu 24.04 LTS**.
3. Select server plan: **2 GB to 6 GB RAM** (e.g. Hetzner `CAX11` / `CX22`, or Contabo `Cloud VPS 1`).
4. Add your SSH Key and click **Create**.

### 2.2 Configure DNS on Antagonist.nl
1. Log in to **Mijn Antagonist**.
2. Go to **Domeinnamen** -> Select your domain (e.g. `easetest.nl`) -> **DNS-beheer**.
3. Add/Update these **A Records**:
   - **Host:** `@` | **Type:** `A` | **Value:** `YOUR_SERVER_IP`
   - **Host:** `www` | **Type:** `A` | **Value:** `YOUR_SERVER_IP`
   - **Host:** `api` | **Type:** `A` | **Value:** `YOUR_SERVER_IP`
4. Click **Opslaan** (Save).

---

## Step 3: Installing Coolify on the Server

### 3.1 Connect to your VPS via SSH
```bash
ssh root@YOUR_SERVER_IP
```

### 3.2 Run the Coolify One-Command Installer
```bash
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

### 3.3 Initial Coolify Setup
1. Open `http://YOUR_SERVER_IP:8000` in your web browser.
2. Create your **Root Administrator Account** (Email & Password).
3. Select **localhost** as the primary server location.

---

## Step 4: Configuring Automatic Deployments in Coolify

### 4.1 Connect GitHub to Coolify
1. In Coolify dashboard, go to **Sources** -> **Add Source** -> **GitHub App**.
2. Follow on-screen prompts to authorize Coolify on your GitHub account.
3. Grant access to your `angular-node-starter` repository.

### 4.2 Deploy Database (MySQL)
1. Go to **Projects** -> **Default** -> **Production** -> **+ New Resource**.
2. Select **Database** -> **MySQL**.
3. Note the generated credentials or set:
   - **Database Name:** `starter_db`
   - **Root Password:** `secret`
4. Click **Deploy**.
5. Copy the generated **Internal Hostname** (e.g. `mysql` or `mysql-randomhash`) from the MySQL resource page.

### 4.3 Deploy Backend (Node.js API)
1. Click **+ New Resource** -> **Private Repository (GitHub)**.
2. Select `angular-node-starter` repo and `main` branch.
3. Set **Build Pack**: Dockerfile (pointing to `backend/Dockerfile`).
4. Set **Environment Variables**:
   - `PORT`: `3000`
   - `DB_HOST`: Coolify Internal MySQL Hostname (from Step 4.2)
   - `DB_USER`: `root`
   - `DB_PASSWORD`: `secret`
   - `DB_NAME`: `starter_db`
   - `JWT_SECRET`: Any secure random string (e.g. `super-secret-jwt-key-2026!`)
5. Set **Domain Name**: `https://api.easetest.nl` (or `http://YOUR_SERVER_IP:3000`).
6. Click **Deploy**.

### 4.4 Deploy Frontend (Angular)
1. Click **+ New Resource** -> **Private Repository (GitHub)**.
2. Select `angular-node-starter` repo and `main` branch.
3. Set **Base Directory**: `/frontend`.
4. Set **Build Command**: `npm run build`.
5. Set **Domain Name**: `https://easetest.nl`.
6. Click **Deploy**.

---

## Step 5: Verify Automatic Git-Push Deployments

Test your automated CI/CD pipeline:

1. Make a small code change in your local Angular app.
2. Commit and push to main:
   ```bash
   git add .
   git commit -m "fix: update landing page header text"
   git push origin main
   ```
3. Coolify will catch the GitHub webhook, build the app, and update your live site with zero downtime!
