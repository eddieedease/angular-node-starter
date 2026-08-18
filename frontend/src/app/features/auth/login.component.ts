import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-8 sm:p-6 font-sans text-slate-800">
      <div class="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl border border-slate-100/10">
        <div class="mb-6">
          <a routerLink="/" class="text-xs text-slate-500 hover:text-blue-600 transition inline-flex items-center gap-1 mb-3">
            <span>←</span>
            <span>Back to Home</span>
          </a>
          <h2 class="text-2xl font-bold text-slate-900">Sign In</h2>
          <p class="text-xs sm:text-sm text-slate-500">Access your Admin Dashboard</p>
        </div>

        @if (errorMessage()) {
          <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs sm:text-sm mb-5 shadow-xs">
            {{ errorMessage() }}
          </div>
        }

        <form (ngSubmit)="onSubmit()" #loginForm="ngForm" class="space-y-4">
          <div>
            <label for="email" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              [(ngModel)]="email"
              required
              email
              placeholder="admin@example.com"
              class="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-2xs"
            />
          </div>

          <div>
            <label for="password" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              [(ngModel)]="password"
              required
              placeholder="••••••••"
              class="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-2xs"
            />
          </div>

          <button
            type="submit"
            [disabled]="authService.authLoading()"
            class="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-semibold rounded-xl text-sm transition shadow-md hover:shadow-lg cursor-pointer"
          >
            @if (authService.authLoading()) {
              <span>Signing in...</span>
            } @else {
              <span>Sign In →</span>
            }
          </button>
        </form>

        <!-- Quick Demo Login helper button -->
        <div class="mt-8 pt-6 border-t border-dashed border-slate-200 text-center">
          <p class="text-xs font-medium text-slate-600 mb-1.5">Demo Admin Credentials (Auto-Seeded)</p>
          <div class="text-xs text-slate-500 mb-3.5 flex flex-wrap items-center justify-center gap-1">
            <code class="bg-slate-100 px-2 py-0.5 rounded text-slate-800 font-mono">admin&#64;example.com</code>
            <span>/</span>
            <code class="bg-slate-100 px-2 py-0.5 rounded text-slate-800 font-mono">Admin123!</code>
          </div>
          <button
            type="button"
            (click)="fillAdminCredentials()"
            class="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 transition cursor-pointer"
          >
            ⚡ Quick Fill Admin Credentials
          </button>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  errorMessage = signal<string | null>(null);

  fillAdminCredentials() {
    this.email = 'admin@example.com';
    this.password = 'Admin123!';
    this.errorMessage.set(null);
  }

  onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage.set('Please provide both email and password.');
      return;
    }

    this.errorMessage.set(null);
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        const errorText = err.error?.error || err.error?.message || 'Login failed. Please check your credentials and backend container.';
        this.errorMessage.set(errorText);
      },
    });
  }
}
