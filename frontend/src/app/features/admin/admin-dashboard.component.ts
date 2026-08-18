import { Component, inject, signal, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AdminService, AdminStats } from '../../core/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [DatePipe],
  template: `
    <div class="font-sans">
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-slate-900 mb-1">System Overview & Analytics</h2>
        <p class="text-sm text-slate-500">Real-time telemetry fetched from Node.js Express backend and MySQL database.</p>
      </div>

      @if (loading()) {
        <div class="text-center py-16 text-slate-500">
          <div class="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-sm">Loading real-time statistics...</p>
        </div>
      } @else if (error()) {
        <div class="bg-red-50 border border-red-200 text-red-800 p-6 rounded-xl">
          <p class="font-semibold mb-2">Failed to load dashboard metrics: {{ error() }}</p>
          <button (click)="loadStats()" class="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded-md transition">
            Retry Connection
          </button>
        </div>
      } @else if (stats(); as data) {
        <!-- Metrics Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl">👥</div>
            <div>
              <span class="block text-xs font-medium text-slate-500">Total Users</span>
              <strong class="block text-2xl font-bold text-slate-900 my-0.5">{{ data.totalUsers }}</strong>
              <span class="block text-xs text-slate-400">Active DB records</span>
            </div>
          </div>

          <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div class="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-2xl">🗄️</div>
            <div>
              <span class="block text-xs font-medium text-slate-500">Database Status</span>
              <strong class="block text-base font-bold text-green-700 my-0.5">{{ data.dbStatus }}</strong>
              <span class="block text-xs text-slate-400">MySQL 8 container</span>
            </div>
          </div>

          <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div class="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center text-2xl">⏱️</div>
            <div>
              <span class="block text-xs font-medium text-slate-500">Backend Uptime</span>
              <strong class="block text-2xl font-bold text-slate-900 my-0.5">{{ data.uptimeSeconds }}s</strong>
              <span class="block text-xs text-slate-400">Node.js process uptime</span>
            </div>
          </div>

          <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div class="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-2xl">💻</div>
            <div>
              <span class="block text-xs font-medium text-slate-500">System Memory</span>
              <strong class="block text-sm font-bold text-slate-900 my-0.5">{{ data.system.freeMemoryMB }} / {{ data.system.totalMemoryMB }} MB</strong>
              <span class="block text-xs text-slate-400">Free / Total RAM</span>
            </div>
          </div>
        </div>

        <!-- System Details Card -->
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 class="text-base font-bold text-slate-900 mb-4">Server System Diagnostics</h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center border-b border-slate-100 pb-2.5 text-sm">
              <span class="text-slate-500">Platform OS:</span>
              <span class="font-semibold text-slate-900"><code class="bg-slate-100 px-2 py-0.5 rounded text-xs">{{ data.system.platform }}</code></span>
            </div>
            <div class="flex justify-between items-center border-b border-slate-100 pb-2.5 text-sm">
              <span class="text-slate-500">Node.js Version:</span>
              <span class="font-semibold text-slate-900"><code class="bg-slate-100 px-2 py-0.5 rounded text-xs">{{ data.system.nodeVersion }}</code></span>
            </div>
            <div class="flex justify-between items-center border-b border-slate-100 pb-2.5 text-sm">
              <span class="text-slate-500">Server Timestamp:</span>
              <span class="font-semibold text-slate-900">{{ data.serverTime | date:'medium' }}</span>
            </div>
            <div class="flex justify-between items-center text-sm pt-1">
              <span class="text-slate-500">Active Auth Sessions:</span>
              <span class="font-semibold text-slate-900">{{ data.activeSessions }}</span>
            </div>
          </div>
        </div>
      }
    </div>
  `,
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
