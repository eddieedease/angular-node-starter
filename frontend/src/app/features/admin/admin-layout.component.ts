import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="flex min-h-screen bg-slate-50 font-sans text-slate-800 antialiased">
      <!-- Mobile Backdrop Overlay -->
      @if (sidebarOpen()) {
        <div
          (click)="closeSidebar()"
          class="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs md:hidden transition-opacity"
          aria-hidden="true"
        ></div>
      }

      <!-- Sidebar (Desktop static & Mobile Off-canvas Drawer) -->
      <aside
        class="fixed md:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col border-r border-slate-800 transition-transform duration-300 ease-in-out shrink-0"
        [class.-translate-x-full]="!sidebarOpen()"
        [class.translate-x-0]="sidebarOpen()"
        [class.md:translate-x-0]="true"
      >
        <!-- Sidebar Brand Header -->
        <div class="h-16 px-6 border-b border-slate-800 flex items-center justify-between">
          <div class="flex items-center gap-2 text-lg font-bold">
            <span class="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded shadow-xs">Admin</span>
            <span>Starter</span>
          </div>
          <!-- Close button for mobile -->
          <button
            type="button"
            (click)="closeSidebar()"
            class="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Close sidebar"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Navigation Links -->
        <nav class="p-4 flex-1 space-y-1.5 overflow-y-auto">
          <a
            routerLink="/admin/dashboard"
            (click)="closeSidebar()"
            class="flex items-center gap-3 px-4 py-2.5 text-white bg-slate-800 rounded-xl font-medium text-sm transition hover:bg-slate-700"
          >
            <span class="text-base">📊</span>
            <span>Dashboard</span>
          </a>
          <a
            routerLink="/"
            (click)="closeSidebar()"
            class="flex items-center gap-3 px-4 py-2.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl font-medium text-sm transition"
          >
            <span class="text-base">🌐</span>
            <span>Public Site</span>
          </a>
        </nav>

        <!-- User Profile & Logout in Footer -->
        <div class="p-4 border-t border-slate-800 bg-slate-900/50">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white text-sm shrink-0 shadow-xs">
              {{ userInitial() }}
            </div>
            <div class="overflow-hidden min-w-0">
              <strong class="block text-sm text-white truncate">{{ authService.currentUser()?.name || 'Administrator' }}</strong>
              <span class="block text-xs text-slate-400 truncate">{{ authService.currentUser()?.email || 'admin' }}</span>
            </div>
          </div>
          <button
            type="button"
            (click)="authService.logout()"
            class="w-full py-2.5 bg-slate-800 hover:bg-red-950/40 text-red-400 hover:text-red-300 border border-slate-700 hover:border-red-800/60 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2"
          >
            <span>🚪</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <!-- Top Bar Header -->
        <header class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30 shadow-2xs">
          <div class="flex items-center gap-3">
            <!-- Hamburger menu button for mobile -->
            <button
              type="button"
              (click)="toggleSidebar()"
              class="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition focus:outline-hidden"
              aria-label="Open sidebar menu"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 class="text-base sm:text-lg font-bold text-slate-900 truncate">Admin Control Panel</h1>
          </div>

          <!-- Server status indicator -->
          <div class="flex items-center gap-3">
            <span class="inline-flex items-center gap-2 text-xs font-semibold text-green-800 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
              <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span class="hidden sm:inline">API Backend: Online</span>
              <span class="sm:hidden">Online</span>
            </span>
          </div>
        </header>

        <!-- Page Body -->
        <main class="p-4 sm:p-6 lg:p-8 flex-1">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
})
export class AdminLayoutComponent {
  authService = inject(AuthService);
  sidebarOpen = signal<boolean>(false);

  toggleSidebar(): void {
    this.sidebarOpen.update((v) => !v);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  userInitial(): string {
    const name = this.authService.currentUser()?.name || 'A';
    return name.charAt(0).toUpperCase();
  }
}
