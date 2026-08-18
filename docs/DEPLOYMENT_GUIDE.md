# Complete Deployment Guide: GitHub, Hetzner VPS & Coolify

> **Purpose:** Step-by-step instructions to set up GitHub version control, provision a Hetzner VPS, install Coolify, and configure automatic Git-push deployments for your Angular + Node.js + MySQL stack.

---

## Step 1: GitHub Repository Setup

### 1.1 Create a Free GitHub Repository
1. Log in to [GitHub](https://github.com).
2. Click **+** (top right) -> **New repository**.
3. Set **Repository name**: `angular-node-starter` (or your project name).
4. Select **Private** (recommended for production code).
5. Leave "Add a README file" unchecked (since we already have local files).
6. Click **Create repository**.

### 1.2 Push Local Code to GitHub
Open your terminal in your project root directory (`angular-node-starter/`) and run:

```bash
# Initialize Git tracking
git init

# Add .gitignore (ensure node_modules and .env files are excluded)
echo "node_modules/" >> .gitignore
echo ".env" >> .gitignore
echo "dist/" >> .gitignore

# Stage all files and commit
git add .
git commit -m "feat: initial commit with Angular, Node.js, and Docker starter template"

# Link local repository to GitHub (replace with your repo URL)
git branch -M main
git remote add origin git@github.com:YOUR_USERNAME/angular-node-starter.git

# Push code to GitHub
git push -u origin main
```

---

## Step 2: Ordering & Configuring a Hetzner VPS

### 2.1 Order a Server on Hetzner Cloud
1. Sign up / Log in to [Hetzner Cloud Console](https://console.hetzner.cloud).
2. Click **Create Project** -> Name it `Production` (or your app name).
3. Click **Add Server**:
   - **Location:** Choose a location closest to your users (e.g., Falkenstein/Nürnberg in Germany, or Hilversum in NL if available).
   - **Image:** Select **Ubuntu 24.04 LTS**.
   - **Type:** Select **Shared vCPU** -> **Arm64 (CAX11)** or **x86 (CX23)** (2 vCPU, 4GB RAM, ~€6–€8/month).
   - **SSH Keys:** Add your SSH key (so you can connect securely without a password). 
     > 💡 **Tip:** You can quickly find your public SSH key by visiting `https://github.com/YOUR_USERNAME.keys` in your browser!
   - **Name:** `coolify-production-server`.
4. Click **Create & Buy now**.

### 2.2 Point Domain DNS to VPS (Optional but Recommended)
1. Go to your domain registrar (e.g., TransIP, Cloudflare, Namecheap).
2. Add an **A Record**:
   - **Name / Host:** `@` (or `*` for wildcards)
   - **Value / Target:** Your Hetzner VPS IPv4 Address (e.g., `123.45.67.89`)

---

## Step 3: Installing Coolify on the Server

### 3.1 Connect to your VPS via SSH
Open your terminal and run:
```bash
ssh root@YOUR_SERVER_IP
```

### 3.2 Run the Coolify One-Command Installer
Paste the official Coolify installation script into your server SSH terminal:

```bash
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

*The installation takes 2-3 minutes. Once completed, the terminal will display the URL to access your Coolify instance.*

### 3.3 Initial Coolify Setup
1. Open `http://YOUR_SERVER_IP:8000` in your web browser.
2. Create your **Root Administrator Account** (Email & Password).
3. Select **localhost** as the primary server location.

---

## Step 4: Configuring the First Automatic Deployment

### 4.1 Connect GitHub to Coolify
1. In Coolify dashboard, go to **Sources** -> **Add Source** -> **GitHub App**.
2. Follow the on-screen prompt to authorize Coolify on your GitHub account.
3. Grant access to your `angular-node-starter` repository.

### 4.2 Deploy the Database (MySQL)
1. In Coolify, go to **Projects** -> **Default** -> **Production** -> **+ New Resource**.
2. Select **Database** -> **MySQL**.
3. Set database name, root password, and internal credentials.
4. Click **Deploy**.

### 4.3 Deploy Backend (Node.js API)
1. Click **+ New Resource** -> **Private Repository (GitHub)**.
2. Select `angular-node-starter` repo and `main` branch.
3. Set **Build Pack**: Nixpacks or Dockerfile (pointing to `backend/Dockerfile`).
4. Set **Environment Variables**:
   - `DB_HOST`: Coolify internal MySQL container hostname/IP.
   - `DB_USER`, `DB_PASS`, `DB_NAME`.
   - `JWT_SECRET`: A secure random string.
5. Set Domain name (e.g., `https://api.yourdomain.com`).
6. Click **Deploy**.

### 4.4 Deploy Frontend (Angular)
1. Click **+ New Resource** -> **Private Repository (GitHub)**.
2. Select `angular-node-starter` repo and `main` branch.
3. Set **Base Directory**: `/frontend`.
4. Set **Build Command**: `npm run build`.
5. Set **Domain Name**: `https://yourdomain.com`.
6. Click **Deploy**.

---

## Step 5: Verify Automatic Git-Push Deployment

Test your new automated workflow:

1. Make a small code change in your local Angular app (e.g., change heading text).
2. Commit and push to main:
   ```bash
   git add .
   git commit -m "fix: update landing page header text"
   git push origin main
   ```
3. Watch Coolify automatically catch the webhook, trigger a new build, and update your live website with zero downtime!
