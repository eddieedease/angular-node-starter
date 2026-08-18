import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="flex min-h-screen bg-slate-50 font-sans">
      <!-- Sidebar -->
      <aside class="w-64 bg-slate-900 text-white flex flex-col border-r border-slate-800">
        <div class="p-6 border-b border-slate-800">
          <div class="flex items-center gap-2 text-lg font-bold">
            <span class="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded">Admin</span>
            <span>Starter</span>
          </div>
        </div>

        <nav class="p-4 flex-1 space-y-1">
          <a routerLink="/admin/dashboard" class="flex items-center gap-3 px-4 py-2.5 text-white bg-slate-800 rounded-lg font-medium text-sm transition">
            <span class="text-base">📊</span>
            <span>Dashboard</span>
          </a>
          <a routerLink="/" class="flex items-center gap-3 px-4 py-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg font-medium text-sm transition">
            <span class="text-base">🌐</span>
            <span>Public Site</span>
          </a>
          <a href="http://localhost:8080" target="_blank" rel="noopener" class="flex items-center gap-3 px-4 py-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg font-medium text-sm transition">
            <span class="text-base">🗄️</span>
            <span>phpMyAdmin ↗</span>
          </a>
        </nav>

        <div class="p-4 border-t border-slate-800">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white text-sm">
              {{ userInitial() }}
            </div>
            <div class="overflow-hidden">
              <strong class="block text-sm text-white truncate">{{ authService.currentUser()?.name }}</strong>
              <span class="block text-xs text-slate-400 truncate">{{ authService.currentUser()?.email }}</span>
            </div>
          </div>
          <button
            (click)="authService.logout()"
            class="w-full py-2 bg-slate-800 hover:bg-slate-700 text-red-400 border border-slate-700 rounded-lg text-xs font-semibold transition"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      <!-- Main Content Area -->
      <main class="flex-1 flex flex-col overflow-x-hidden">
        <!-- Top Bar Header -->
        <header class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <div>
            <h1 class="text-lg font-bold text-slate-900">Admin Control Panel</h1>
          </div>
          <div>
            <span class="inline-flex items-center gap-2 text-xs font-semibold text-green-800 bg-green-100 px-3 py-1 rounded-full">
              <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              API Backend: Online
            </span>
          </div>
        </header>

        <!-- Page Body -->
        <div class="p-8 flex-1">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
})
export class AdminLayoutComponent {
  authService = inject(AuthService);

  userInitial(): string {
    const name = this.authService.currentUser()?.name || 'A';
    return name.charAt(0).toUpperCase();
  }
}
