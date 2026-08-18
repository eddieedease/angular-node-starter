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
  readonly currentUser = signal<User | null>(this.getInitialUser());
  readonly token = signal<string | null>(localStorage.getItem('token'));
  readonly isAuthenticated = computed(() => !!this.token() && !!this.currentUser());
  readonly authLoading = signal<boolean>(false);

  constructor() {
    // Verify session on app initialization if token exists
    if (this.token() && !this.currentUser()) {
      this.fetchCurrentUser().subscribe();
    }
  }

  private getInitialUser(): User | null {
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
        this.logout();
        return of(null);
      })
    );
  }

  logout(): void {
    this.http.post('/api/auth/logout', {}).subscribe({
      next: () => this.clearSession(),
      error: () => this.clearSession(),
    });
  }

  private clearSession(): void {
    this.token.set(null);
    this.currentUser.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
