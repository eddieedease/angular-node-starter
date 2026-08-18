import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-800 font-sans">
      <!-- Top Navigation Header -->
      <header class="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div class="flex items-center gap-2 text-lg font-bold text-slate-900">
          <span class="bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded">v21</span>
          <span>Angular + Node Starter</span>
        </div>
        <nav class="flex items-center gap-6 text-sm font-medium">
          <a href="#features" class="text-slate-600 hover:text-slate-900 transition">Features</a>
          <a href="#architecture" class="text-slate-600 hover:text-slate-900 transition">Architecture</a>
          @if (authService.isAuthenticated()) {
            <a routerLink="/admin/dashboard" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition shadow-sm">
              Go to Dashboard
            </a>
          } @else {
            <a routerLink="/login" class="bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold px-4 py-2 rounded-lg transition">
              Sign In
            </a>
          }
        </nav>
      </header>

      <!-- Hero Section -->
      <section class="max-w-4xl mx-auto text-center px-4 py-20">
        <div class="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
          🚀 Production Ready Starter Template
        </div>
        <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
          Modern Full-Stack Angular & Node.js Platform
        </h1>
        <p class="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
          An enterprise-grade template built with Angular 21 (Zoneless + Signals + Tailwind CSS), Express TypeScript API,
          MySQL 8, and instant Docker Compose orchestration.
        </p>

        <div class="flex flex-wrap items-center justify-center gap-4">
          @if (authService.isAuthenticated()) {
            <a routerLink="/admin/dashboard" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5">
              Enter Admin Dashboard →
            </a>
          } @else {
            <a routerLink="/login" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5">
              Live Demo Admin Login →
            </a>
          }
          <a href="http://localhost:8080" target="_blank" rel="noopener" class="bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold text-base px-6 py-3 rounded-lg shadow-sm transition">
            phpMyAdmin (Port 8080) ↗
          </a>
        </div>
      </section>

      <!-- Tech Stack Features Grid -->
      <section id="features" class="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 class="text-3xl font-bold text-slate-900 mb-2">Built with Modern Web Technologies</h2>
        <p class="text-slate-600 text-lg mb-12">Tailwind CSS, Angular Signals, Express TypeScript, and MySQL 8.</p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          @for (feature of techFeatures; track feature.title) {
            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-200">
              <div class="text-3xl mb-4">{{ feature.icon }}</div>
              <h3 class="text-xl font-bold text-slate-900 mb-2">{{ feature.title }}</h3>
              <p class="text-slate-600 text-sm leading-relaxed">{{ feature.description }}</p>
            </div>
          }
        </div>
      </section>

      <!-- Architecture Overview -->
      <section id="architecture" class="max-w-4xl mx-auto px-6 py-12 text-center">
        <h2 class="text-2xl font-bold text-slate-900 mb-6">Local Architecture & Flow</h2>
        <div class="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-around gap-6">
          <div class="flex flex-col items-center gap-1">
            <span class="bg-red-100 text-red-800 text-xs font-bold px-2 py-0.5 rounded">Angular CLI</span>
            <strong class="text-slate-900">Frontend (:4200)</strong>
            <span class="text-xs text-slate-500">ng serve + proxy.conf</span>
          </div>
          <div class="text-blue-600 font-bold text-lg hidden md:block">➔ /api/* ➔</div>
          <div class="flex flex-col items-center gap-1">
            <span class="bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded">Node.js Express</span>
            <strong class="text-slate-900">Backend API (:3000)</strong>
            <span class="text-xs text-slate-500">TypeScript + JWT</span>
          </div>
          <div class="text-blue-600 font-bold text-lg hidden md:block">➔ SQL ➔</div>
          <div class="flex flex-col items-center gap-1">
            <span class="bg-sky-100 text-sky-800 text-xs font-bold px-2 py-0.5 rounded">MySQL 8</span>
            <strong class="text-slate-900">Database (:3306)</strong>
            <span class="text-xs text-slate-500">Persistent Volume</span>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-white border-t border-slate-200 text-center py-6 text-slate-500 text-sm mt-12">
        <p>© 2026 Angular + Node Starter Template. Free & Open Source under MIT License.</p>
      </footer>
    </div>
  `,
})
export class LandingComponent {
  authService = inject(AuthService);

  techFeatures = [
    {
      icon: '🎨',
      title: 'Tailwind CSS Utility',
      description: 'Integrated Tailwind CSS styling system for modern, responsive, utility-first UI development.',
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
      title: 'Docker Compose',
      description: 'Includes pre-configured Node API, MySQL 8 container with persistent volume, and phpMyAdmin GUI.',
    },
    {
      icon: '🛠️',
      title: 'Express & TypeScript',
      description: 'Type-safe backend API architecture with Zod schema validation and connection retries.',
    },
    {
      icon: '🎛️',
      title: 'Admin Dashboard',
      description: 'Protected dashboard featuring real-time system metrics, session info, and memory diagnostics.',
    },
  ];
}
