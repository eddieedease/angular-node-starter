import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="login-wrapper">
      <div class="login-card">
        <div class="card-header">
          <a routerLink="/" class="back-link">← Back to Home</a>
          <h2>Sign In</h2>
          <p>Access your Admin Dashboard</p>
        </div>

        @if (errorMessage()) {
          <div class="alert alert-error">
            {{ errorMessage() }}
          </div>
        }

        <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              [(ngModel)]="email"
              required
              email
              placeholder="admin@example.com"
            />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              [(ngModel)]="password"
              required
              placeholder="••••••••"
            />
          </div>

          <button type="submit" class="btn btn-submit" [disabled]="authService.authLoading()">
            @if (authService.authLoading()) {
              <span>Signing in...</span>
            } @else {
              <span>Sign In</span>
            }
          </button>
        </form>

        <!-- Quick Demo Login helper button -->
        <div class="demo-box">
          <p><strong>Demo Admin Credentials</strong> (Auto-Seeded)</p>
          <div class="credentials-info">
            <code>admin&#64;example.com</code> / <code>Admin123!</code>
          </div>
          <button type="button" class="btn btn-demo" (click)="fillAdminCredentials()">
            ⚡ Quick Fill Admin Credentials
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-wrapper {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      padding: 1.5rem;
      font-family: system-ui, -apple-system, sans-serif;
    }
    .login-card {
      background: white;
      border-radius: 16px;
      padding: 2.5rem;
      width: 100%;
      max-width: 420px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
    }
    .card-header {
      margin-bottom: 1.5rem;
    }
    .back-link {
      font-size: 0.85rem;
      color: #64748b;
      text-decoration: none;
      display: inline-block;
      margin-bottom: 1rem;
    }
    .back-link:hover { color: #2563eb; }
    .card-header h2 { font-size: 1.75rem; color: #0f172a; margin-bottom: 0.25rem; }
    .card-header p { color: #64748b; font-size: 0.95rem; }

    .alert {
      padding: 0.75rem 1rem;
      border-radius: 8px;
      font-size: 0.9rem;
      margin-bottom: 1.25rem;
    }
    .alert-error { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }

    .form-group {
      margin-bottom: 1.25rem;
      text-align: left;
    }
    .form-group label {
      display: block;
      font-size: 0.875rem;
      font-weight: 600;
      color: #334155;
      margin-bottom: 0.4rem;
    }
    .form-group input {
      width: 100%;
      padding: 0.75rem 0.9rem;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      font-size: 0.95rem;
      box-sizing: border-box;
      transition: border-color 0.2s;
    }
    .form-group input:focus {
      outline: none;
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
    }

    .btn-submit {
      width: 100%;
      padding: 0.85rem;
      background: #2563eb;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-submit:hover:not(:disabled) { background: #1d4ed8; }
    .btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }

    .demo-box {
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px dashed #e2e8f0;
      text-align: center;
    }
    .demo-box p { font-size: 0.85rem; color: #475569; margin-bottom: 0.5rem; }
    .credentials-info { font-size: 0.85rem; color: #64748b; margin-bottom: 0.75rem; }
    .credentials-info code { background: #f1f5f9; padding: 0.2rem 0.4rem; border-radius: 4px; color: #0f172a; }

    .btn-demo {
      background: #f1f5f9;
      color: #0f172a;
      border: 1px solid #cbd5e1;
      padding: 0.5rem 0.9rem;
      border-radius: 6px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-demo:hover { background: #e2e8f0; }
  `],
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
