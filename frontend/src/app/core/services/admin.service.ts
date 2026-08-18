import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AdminStats {
  totalUsers: number;
  dbStatus: string;
  uptimeSeconds: number;
  serverTime: string;
  system: {
    platform: string;
    nodeVersion: string;
    totalMemoryMB: number;
    freeMemoryMB: number;
  };
  activeSessions: number;
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private http = inject(HttpClient);

  getStats(): Observable<{ stats: AdminStats }> {
    return this.http.get<{ stats: AdminStats }>('/api/admin/stats');
  }
}
