import { Component, inject, signal, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AdminService, AdminStats } from '../../core/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [DatePipe],
  template: `
    <div class="font-sans max-w-7xl mx-auto">
      <!-- Dashboard Header -->
      <div class="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900 mb-1">System Overview & Analytics</h2>
          <p class="text-xs sm:text-sm text-slate-500">Real-time telemetry fetched from Express backend and MySQL database.</p>
        </div>
        <div>
          <button
            type="button"
            (click)="loadStats()"
            [disabled]="loading()"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold border border-slate-200 rounded-xl shadow-xs transition disabled:opacity-60"
          >
            <span [class.animate-spin]="loading()">🔄</span>
            <span>Refresh Metrics</span>
          </button>
        </div>
      </div>

      @if (loading() && !stats()) {
        <div class="text-center py-20 text-slate-500">
          <div class="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-sm font-medium">Loading real-time statistics...</p>
        </div>
      } @else if (error() && !stats()) {
        <div class="bg-red-50 border border-red-200 text-red-800 p-6 rounded-2xl shadow-xs">
          <p class="font-semibold mb-3 text-sm sm:text-base">Failed to load dashboard metrics: {{ error() }}</p>
          <button
            (click)="loadStats()"
            class="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition shadow-xs"
          >
            Retry Connection
          </button>
        </div>
      } @else if (stats(); as data) {
        <!-- Metrics Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <!-- Total Users -->
          <div class="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-2xl shrink-0 border border-blue-100">
              👥
            </div>
            <div class="min-w-0">
              <span class="block text-xs font-medium text-slate-500 uppercase tracking-wider">Total Users</span>
              <strong class="block text-xl sm:text-2xl font-bold text-slate-900 my-0.5">{{ data.totalUsers }}</strong>
              <span class="block text-xs text-slate-400 truncate">Active DB records</span>
            </div>
          </div>

          <!-- Database Status -->
          <div class="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center text-2xl shrink-0 border border-green-100">
              🗄️
            </div>
            <div class="min-w-0">
              <span class="block text-xs font-medium text-slate-500 uppercase tracking-wider">Database</span>
              <strong class="block text-sm sm:text-base font-bold text-green-700 my-0.5 truncate">{{ data.dbStatus }}</strong>
              <span class="block text-xs text-slate-400 truncate">MySQL 8.0 connection</span>
            </div>
          </div>

          <!-- Backend Uptime -->
          <div class="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-2xl shrink-0 border border-amber-100">
              ⏱️
            </div>
            <div class="min-w-0">
              <span class="block text-xs font-medium text-slate-500 uppercase tracking-wider">API Uptime</span>
              <strong class="block text-xl sm:text-2xl font-bold text-slate-900 my-0.5">{{ data.uptimeSeconds }}s</strong>
              <span class="block text-xs text-slate-400 truncate">Node.js process uptime</span>
            </div>
          </div>

          <!-- System Memory -->
          <div class="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-2xl shrink-0 border border-purple-100">
              💻
            </div>
            <div class="min-w-0">
              <span class="block text-xs font-medium text-slate-500 uppercase tracking-wider">System Memory</span>
              <strong class="block text-sm sm:text-base font-bold text-slate-900 my-0.5 truncate">
                {{ data.system.freeMemoryMB }} / {{ data.system.totalMemoryMB }} MB
              </strong>
              <span class="block text-xs text-slate-400 truncate">Free / Total RAM</span>
            </div>
          </div>
        </div>

        <!-- System Details Card -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-7">
          <h3 class="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Server System Diagnostics</h3>
          <div class="space-y-3.5">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 text-xs sm:text-sm gap-1 sm:gap-0">
              <span class="text-slate-500">Platform OS:</span>
              <span class="font-semibold text-slate-900"><code class="bg-slate-100 px-2 py-0.5 rounded text-xs">{{ data.system.platform }}</code></span>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 text-xs sm:text-sm gap-1 sm:gap-0">
              <span class="text-slate-500">Node.js Version:</span>
              <span class="font-semibold text-slate-900"><code class="bg-slate-100 px-2 py-0.5 rounded text-xs">{{ data.system.nodeVersion }}</code></span>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 text-xs sm:text-sm gap-1 sm:gap-0">
              <span class="text-slate-500">Server Timestamp:</span>
              <span class="font-semibold text-slate-900">{{ data.serverTime | date:'medium' }}</span>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm pt-0.5 gap-1 sm:gap-0">
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
