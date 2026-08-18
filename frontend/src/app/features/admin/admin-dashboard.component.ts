import { Component, inject, signal, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AdminService, AdminStats } from '../../core/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [DatePipe],
  template: `
    <div class="dashboard-wrapper">
      <div class="dashboard-header">
        <h2>System Overview & Analytics</h2>
        <p>Real-time telemetry fetched from Node.js Express backend and MySQL database.</p>
      </div>

      @if (loading()) {
        <div class="loading-state">
          <div class="spinner"></div>
          <p>Loading real-time statistics...</p>
        </div>
      } @else if (error()) {
        <div class="alert alert-error">
          <p><strong>Failed to load dashboard metrics:</strong> {{ error() }}</p>
          <button (click)="loadStats()" class="btn btn-retry">Retry Connection</button>
        </div>
      } @else if (stats(); as data) {
        <!-- Metrics Cards Grid -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon users">👥</div>
            <div class="stat-body">
              <span class="stat-label">Total Users</span>
              <strong class="stat-value">{{ data.totalUsers }}</strong>
              <span class="stat-hint">Active database records</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon db">🗄️</div>
            <div class="stat-body">
              <span class="stat-label">Database Status</span>
              <strong class="stat-value status-ok">{{ data.dbStatus }}</strong>
              <span class="stat-hint">MySQL 8 container</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon uptime">⏱️</div>
            <div class="stat-body">
              <span class="stat-label">Backend Uptime</span>
              <strong class="stat-value">{{ data.uptimeSeconds }}s</strong>
              <span class="stat-hint">Node.js process uptime</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon memory">💻</div>
            <div class="stat-body">
              <span class="stat-label">System Memory</span>
              <strong class="stat-value">{{ data.system.freeMemoryMB }} / {{ data.system.totalMemoryMB }} MB</strong>
              <span class="stat-hint">Free / Total RAM</span>
            </div>
          </div>
        </div>

        <!-- System Details Card -->
        <div class="details-card">
          <h3>Server System Info</h3>
          <div class="info-rows">
            <div class="info-row">
              <span class="info-label">Platform OS:</span>
              <span class="info-val"><code>{{ data.system.platform }}</code></span>
            </div>
            <div class="info-row">
              <span class="info-label">Node.js Version:</span>
              <span class="info-val"><code>{{ data.system.nodeVersion }}</code></span>
            </div>
            <div class="info-row">
              <span class="info-label">Server Timestamp:</span>
              <span class="info-val">{{ data.serverTime | date:'medium' }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Active Auth Sessions:</span>
              <span class="info-val">{{ data.activeSessions }}</span>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .dashboard-wrapper { font-family: system-ui, -apple-system, sans-serif; }
    .dashboard-header { margin-bottom: 2rem; }
    .dashboard-header h2 { font-size: 1.5rem; color: #0f172a; margin-bottom: 0.25rem; }
    .dashboard-header p { color: #64748b; font-size: 0.95rem; }

    .loading-state {
      text-align: center;
      padding: 4rem;
      color: #64748b;
    }
    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid #e2e8f0;
      border-top-color: #2563eb;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin: 0 auto 1rem;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    .alert-error {
      background: #fef2f2;
      border: 1px solid #fecaca;
      color: #991b1b;
      padding: 1.5rem;
      border-radius: 12px;
    }
    .btn-retry {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      background: #dc2626;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      gap: 1.25rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }
    .stat-icon {
      width: 52px;
      height: 52px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.75rem;
    }
    .stat-icon.users { background: #dbeafe; }
    .stat-icon.db { background: #dcfce7; }
    .stat-icon.uptime { background: #fef3c7; }
    .stat-icon.memory { background: #f3e8ff; }

    .stat-body { display: flex; flex-direction: column; }
    .stat-label { font-size: 0.85rem; color: #64748b; font-weight: 500; }
    .stat-value { font-size: 1.5rem; font-weight: 700; color: #0f172a; margin: 0.2rem 0; }
    .stat-value.status-ok { color: #166534; font-size: 1.1rem; }
    .stat-hint { font-size: 0.75rem; color: #94a3b8; }

    .details-card {
      background: white;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      padding: 1.5rem;
    }
    .details-card h3 { font-size: 1.1rem; color: #0f172a; margin-bottom: 1.25rem; }
    .info-rows { display: flex; flex-direction: column; gap: 0.85rem; }
    .info-row { display: flex; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.6rem; }
    .info-label { color: #64748b; font-size: 0.9rem; }
    .info-val { font-weight: 600; color: #1e293b; font-size: 0.9rem; }
    .info-val code { background: #f1f5f9; padding: 0.2rem 0.4rem; border-radius: 4px; }
  `],
})
export class AdminDashboardComponent implements OnInit {
  private adminService = inject(AdminService);

  stats = signal<AdminStats | null>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.loading.set(true);
    this.error.set(null);
    this.adminService.getStats().subscribe({
      next: (res) => {
        this.stats.set(res.stats);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.error || 'Could not connect to API server.');
        this.loading.set(false);
      },
    });
  }
}
