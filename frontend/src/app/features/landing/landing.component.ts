import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-800 font-sans flex flex-col">
      <!-- Top Navigation Header -->
      <header class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <!-- Brand Logo -->
            <div class="flex items-center gap-2 text-base sm:text-lg font-bold text-slate-900">
              <span class="bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded shadow-xs">v21</span>
              <span class="truncate">Angular + Node Starter</span>
            </div>

            <!-- Desktop Navigation -->
            <nav class="hidden md:flex items-center gap-8 text-sm font-medium">
              <a href="#features" class="text-slate-600 hover:text-blue-600 transition">Features</a>
              <a href="#architecture" class="text-slate-600 hover:text-blue-600 transition">Architecture</a>
              @if (authService.isAuthenticated()) {
                <a routerLink="/admin/dashboard" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition shadow-sm">
                  Go to Dashboard →
                </a>
              } @else {
                <a routerLink="/login" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition shadow-sm">
                  Sign In
                </a>
              }
            </nav>

            <!-- Mobile Menu Button -->
            <div class="flex md:hidden items-center gap-2">
              @if (authService.isAuthenticated()) {
                <a routerLink="/admin/dashboard" class="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition">
                  Dashboard
                </a>
              } @else {
                <a routerLink="/login" class="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition">
                  Sign In
                </a>
              }
              <button
                type="button"
                (click)="toggleMobileMenu()"
                class="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition focus:outline-hidden"
                aria-label="Toggle navigation menu"
              >
                @if (mobileMenuOpen()) {
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                } @else {
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                }
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile Collapsible Menu -->
        @if (mobileMenuOpen()) {
          <div class="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg">
            <a
              href="#features"
              (click)="closeMobileMenu()"
              class="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100 transition"
            >
              Features
            </a>
            <a
              href="#architecture"
              (click)="closeMobileMenu()"
              class="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100 transition"
            >
              Architecture
            </a>
            <div class="pt-2 border-t border-slate-100">
              @if (authService.isAuthenticated()) {
                <a
                  routerLink="/admin/dashboard"
                  (click)="closeMobileMenu()"
                  class="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-lg transition"
                >
                  Enter Admin Dashboard →
                </a>
              } @else {
                <a
                  routerLink="/login"
                  (click)="closeMobileMenu()"
                  class="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-lg transition"
                >
                  Sign In to Admin
                </a>
              }
            </div>
          </div>
        }
      </header>

      <!-- Hero Section -->
      <section class="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24 flex-1 flex flex-col justify-center">
        <div class="inline-flex items-center gap-2 bg-blue-50 border border-blue-200/80 text-blue-700 text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full mb-6 mx-auto shadow-xs">
          <span>🚀</span>
          <span>Production Ready Starter Template</span>
        </div>
        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-tight mb-6">
          Modern Full-Stack <br class="hidden sm:inline" />
          <span class="text-blue-600">Angular & Node.js</span> Platform
        </h1>
        <p class="text-base sm:text-lg md:text-xl text-slate-600 mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto px-2">
          An enterprise-grade starter template built with Angular 21 (Zoneless + Signals + Tailwind CSS), Express TypeScript API,
          MySQL 8, and automated container deployment.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto w-full px-4">
          @if (authService.isAuthenticated()) {
            <a
              routerLink="/admin/dashboard"
              class="w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
            >
              Enter Admin Dashboard →
            </a>
          } @else {
            <a
              routerLink="/login"
              class="w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
            >
              Live Demo Admin Login →
            </a>
          }
          <a
            href="#features"
            class="w-full sm:w-auto text-center bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-xs transition"
          >
            Explore Features ↓
          </a>
        </div>
      </section>

      <!-- Tech Stack Features Grid -->
      <section id="features" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center border-t border-slate-200/80">
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 tracking-tight">Built with Modern Web Technologies</h2>
        <p class="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-10 sm:mb-14">Tailwind CSS, Angular Signals, Express TypeScript, and MySQL 8.</p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 text-left">
          @for (feature of techFeatures; track feature.title) {
            <div class="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:-translate-y-1 transition duration-200 flex flex-col justify-between">
              <div>
                <div class="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-2xl mb-4">
                  {{ feature.icon }}
                </div>
                <h3 class="text-lg sm:text-xl font-bold text-slate-900 mb-2">{{ feature.title }}</h3>
                <p class="text-slate-600 text-xs sm:text-sm leading-relaxed">{{ feature.description }}</p>
              </div>
            </div>
          }
        </div>
      </section>

      <!-- Architecture Overview -->
      <section id="architecture" class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center border-t border-slate-200/80">
        <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 tracking-tight">System Architecture & Data Flow</h2>
        <p class="text-slate-600 text-sm sm:text-base mb-8 sm:mb-12">Clean separation of concerns from client interface to persistent storage.</p>
        
        <div class="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <!-- Client Card -->
          <div class="flex-1 w-full flex flex-col items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span class="bg-red-100 text-red-800 text-xs font-bold px-2.5 py-0.5 rounded-full mb-2">Frontend</span>
            <strong class="text-slate-900 text-base">Angular 21 UI</strong>
            <span class="text-xs text-slate-500 mt-1">Zoneless + Signals + Tailwind</span>
          </div>

          <!-- Flow Arrow 1 -->
          <div class="flex items-center justify-center text-blue-600 font-bold text-sm sm:text-base py-1 md:py-0">
            <span class="hidden md:inline">➔ /api/* ➔</span>
            <span class="md:hidden">↓ /api/* ↓</span>
          </div>

          <!-- Backend Card -->
          <div class="flex-1 w-full flex flex-col items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span class="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-0.5 rounded-full mb-2">Backend API</span>
            <strong class="text-slate-900 text-base">Express TypeScript</strong>
            <span class="text-xs text-slate-500 mt-1">JWT Auth + Zod Validation</span>
          </div>

          <!-- Flow Arrow 2 -->
          <div class="flex items-center justify-center text-blue-600 font-bold text-sm sm:text-base py-1 md:py-0">
            <span class="hidden md:inline">➔ SQL ➔</span>
            <span class="md:hidden">↓ SQL ↓</span>
          </div>

          <!-- Database Card -->
          <div class="flex-1 w-full flex flex-col items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span class="bg-sky-100 text-sky-800 text-xs font-bold px-2.5 py-0.5 rounded-full mb-2">Database</span>
            <strong class="text-slate-900 text-base">MySQL 8.0</strong>
            <span class="text-xs text-slate-500 mt-1">Connection Pool & Auto-Seed</span>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-white border-t border-slate-200 text-center py-8 text-slate-500 text-xs sm:text-sm mt-auto">
        <p>© 2026 Angular + Node Starter Template. Built for seamless production deployment.</p>
      </footer>
    </div>
  `,
})
export class LandingComponent {
  authService = inject(AuthService);
  mobileMenuOpen = signal<boolean>(false);

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  techFeatures = [
    {
      icon: '🎨',
      title: 'Tailwind CSS Utility',
      description: 'Integrated modern Tailwind CSS styling system for responsive, utility-first UI development.',
    },
    {
      icon: '⚡',
      title: 'Angular 21 Zoneless',
      description: 'Built with provideZonelessChangeDetection() and Signals for optimal reactivity and modern performance.',
    },
    {
      icon: '🔐',
      title: 'JWT Auth & Security',
      description: 'Complete JWT flow with bcrypt password hashing, functional interceptors, and route guards.',
    },
    {
      icon: '🐳',
      title: 'Docker & CI/CD',
      description: 'Pre-configured multi-stage Docker builds optimized for Coolify, VPS, and automated Git-push deployments.',
    },
    {
      icon: '🛠️',
      title: 'Express & TypeScript',
      description: 'Type-safe backend API architecture with Zod schema validation, CORS, and connection retries.',
    },
    {
      icon: '🎛️',
      title: 'Admin Dashboard',
      description: 'Protected dashboard featuring real-time system metrics, session info, and memory diagnostics.',
    },
  ];
}
