import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.token();

  let authReq = req;
  if (token) {
    authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  }

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      // If 401 Unauthorized or 403 Forbidden is returned from API (except when attempting to login)
      if ((err.status === 401 || err.status === 403) && !req.url.includes('/api/auth/login')) {
        console.warn(`[AuthInterceptor] HTTP ${err.status} received: session expired or unauthorized. Reverting to login.`);
        authService.clearSession(true);
      }
      return throwError(() => err);
    })
  );
};
