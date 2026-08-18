import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="admin-shell">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <div class="logo">
            <span class="badge">Admin</span>
            <strong>Starter</strong>
          </div>
        </div>

        <nav class="sidebar-nav">
          <a routerLink="/admin/dashboard" class="nav-item active">
            <span class="icon">📊</span>
            <span>Dashboard</span>
          </a>
          <a routerLink="/" class="nav-item">
            <span class="icon">🌐</span>
            <span>Public Site</span>
          </a>
          <a href="http://localhost:8080" target="_blank" rel="noopener" class="nav-item">
            <span class="icon">🗄️</span>
            <span>phpMyAdmin ↗</span>
          </a>
        </nav>

        <div class="sidebar-footer">
          <div class="user-info">
            <div class="avatar">{{ userInitial() }}</div>
            <div class="details">
              <strong class="user-name">{{ authService.currentUser()?.name }}</strong>
              <span class="user-email">{{ authService.currentUser()?.email }}</span>
            </div>
          </div>
          <button class="btn-logout" (click)="authService.logout()">
            🚪 Logout
          </button>
        </div>
      </aside>

      <!-- Main Content Area -->
      <main class="main-content">
        <!-- Top Bar Header -->
        <header class="topbar">
          <div class="topbar-title">
            <h1>Admin Control Panel</h1>
          </div>
          <div class="topbar-actions">
            <span class="status-indicator">
              <span class="pulse-dot"></span>
              API Backend: Online
            </span>
          </div>
        </header>

        <!-- Page Body -->
        <div class="content-body">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .admin-shell {
      display: flex;
      min-height: 100vh;
      background: #f8fafc;
      font-family: system-ui, -apple-system, sans-serif;
    }
    .sidebar {
      width: 260px;
      background: #0f172a;
      color: white;
      display: flex;
      flex-direction: column;
      border-right: 1px solid #1e293b;
    }
    .sidebar-header {
      padding: 1.5rem;
      border-bottom: 1px solid #1e293b;
    }
    .logo {
      font-size: 1.25rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .badge {
      background: #2563eb;
      color: white;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.15rem 0.4rem;
      border-radius: 4px;
    }
    .sidebar-nav {
      padding: 1.5rem 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      flex: 1;
    }
    .nav-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      color: #94a3b8;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 500;
      transition: all 0.2s;
    }
    .nav-item:hover, .nav-item.active {
      color: white;
      background: #1e293b;
    }
    .sidebar-footer {
      padding: 1.25rem;
      border-top: 1px solid #1e293b;
    }
    .user-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }
    .avatar {
      width: 36px;
      height: 36px;
      background: #2563eb;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
    }
    .details {
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .user-name { font-size: 0.9rem; color: white; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; }
    .user-email { font-size: 0.75rem; color: #64748b; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; }

    .btn-logout {
      width: 100%;
      padding: 0.6rem;
      background: #1e293b;
      color: #ef4444;
      border: 1px solid #334155;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-logout:hover { background: #334155; }

    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
    }
    .topbar {
      height: 64px;
      background: white;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 2rem;
    }
    .topbar-title h1 { font-size: 1.25rem; color: #0f172a; font-weight: 700; margin: 0; }
    .status-indicator {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.85rem;
      color: #166534;
      background: #dcfce7;
      padding: 0.4rem 0.8rem;
      border-radius: 9999px;
      font-weight: 600;
    }
    .pulse-dot {
      width: 8px;
      height: 8px;
      background: #22c55e;
      border-radius: 50%;
      box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.4);
    }
    .content-body {
      padding: 2rem;
      flex: 1;
    }
  `],
})
export class AdminLayoutComponent {
  authService = inject(AuthService);

  userInitial(): string {
    const name = this.authService.currentUser()?.name || 'A';
    return name.charAt(0).toUpperCase();
  }
}
