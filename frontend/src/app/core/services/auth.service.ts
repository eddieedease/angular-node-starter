import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, of, map } from 'rxjs';

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  // Reactive state signals
  readonly token = signal<string | null>(this.getInitialToken());
  readonly currentUser = signal<User | null>(this.getInitialUser());
  readonly isAuthenticated = computed(() => {
    const token = this.token();
    const user = this.currentUser();
    return !!token && !!user && !this.isTokenExpired(token);
  });
  readonly authLoading = signal<boolean>(false);

  constructor() {
    // If a token exists, verify with server and refresh user state
    if (this.token()) {
      if (this.isTokenExpired(this.token())) {
        this.clearSession(false);
      } else {
        this.fetchCurrentUser().subscribe();
      }
    }
  }

  isTokenExpired(token: string | null = this.token()): boolean {
    if (!token) return true;
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return true;
      const base64Url = parts[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const payload = JSON.parse(jsonPayload);
      if (!payload.exp) return false;
      return payload.exp * 1000 <= Date.now();
    } catch {
      return true;
    }
  }

  private getInitialToken(): string | null {
    const token = localStorage.getItem('token');
    if (this.isTokenExpired(token)) {
      this.clearStorage();
      return null;
    }
    return token;
  }

  private getInitialUser(): User | null {
    const token = localStorage.getItem('token');
    if (this.isTokenExpired(token)) {
      this.clearStorage();
      return null;
    }
    const cached = localStorage.getItem('user');
    return cached ? JSON.parse(cached) : null;
  }

  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    this.authLoading.set(true);
    return this.http.post<LoginResponse>('/api/auth/login', credentials).pipe(
      tap((res) => {
        this.token.set(res.token);
        this.currentUser.set(res.user);
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.authLoading.set(false);
      }),
      catchError((err) => {
        this.authLoading.set(false);
        throw err;
      })
    );
  }

  fetchCurrentUser(): Observable<User | null> {
    return this.http.get<{ user: User }>('/api/auth/me').pipe(
      map((res) => res.user),
      tap((user) => {
        this.currentUser.set(user);
        localStorage.setItem('user', JSON.stringify(user));
      }),
      catchError(() => {
        this.clearSession(true);
        return of(null);
      })
    );
  }

  logout(): void {
    this.http.post('/api/auth/logout', {}).subscribe({
      next: () => this.clearSession(true),
      error: () => this.clearSession(true),
    });
  }

  clearSession(redirect = true): void {
    this.clearStorage();
    this.token.set(null);
    this.currentUser.set(null);
    if (redirect) {
      this.router.navigate(['/login']);
    }
  }

  private clearStorage(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
