import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="landing-container">
      <!-- Top Navigation Header -->
      <header class="navbar">
        <div class="logo">
          <span class="badge">v21</span>
          <strong>Angular + Node</strong> Starter
        </div>
        <nav class="nav-links">
          <a href="#features">Features</a>
          <a href="#architecture">Architecture</a>
          <a href="#docker">Docker</a>
          @if (authService.isAuthenticated()) {
            <a routerLink="/admin/dashboard" class="btn btn-primary">Go to Dashboard</a>
          } @else {
            <a routerLink="/login" class="btn btn-secondary">Sign In</a>
          }
        </nav>
      </header>

      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <div class="chip">🚀 Production Ready Starter</div>
          <h1>Modern Full-Stack Angular & Node.js Template</h1>
          <p>
            An enterprise-grade starter template built with Angular 21 (Zoneless + Signals), Express TypeScript API,
            MySQL 8, and instant Docker Compose orchestration.
          </p>

          <div class="cta-group">
            @if (authService.isAuthenticated()) {
              <a routerLink="/admin/dashboard" class="btn btn-hero-primary">Enter Dashboard →</a>
            } @else {
              <a routerLink="/login" class="btn btn-hero-primary">Live Demo Admin Login →</a>
            }
            <a href="http://localhost:8080" target="_blank" rel="noopener" class="btn btn-hero-outline">
              phpMyAdmin (Port 8080) ↗
            </a>
          </div>
        </div>
      </section>

      <!-- Tech Stack Features Grid -->
      <section id="features" class="features-section">
        <h2>Built with Cutting-Edge Technologies</h2>
        <p class="subtitle">Designed for speed, developer ergonomics, and rapid deployment.</p>

        <div class="grid">
          @for (feature of techFeatures; track feature.title) {
            <div class="card">
              <div class="card-icon">{{ feature.icon }}</div>
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </div>
          }
        </div>
      </section>

      <!-- Architecture Overview -->
      <section id="architecture" class="architecture-section">
        <h2>Local Architecture & Flow</h2>
        <div class="arch-box">
          <div class="arch-node">
            <span class="tag frontend">Angular CLI</span>
            <strong>Frontend (:4200)</strong>
            <span>ng serve + proxy.conf</span>
          </div>
          <div class="arch-arrow">➔ /api/* ➔</div>
          <div class="arch-node">
            <span class="tag backend">Node.js Express</span>
            <strong>Backend API (:3000)</strong>
            <span>TypeScript + JWT</span>
          </div>
          <div class="arch-arrow">➔ SQL ➔</div>
          <div class="arch-node">
            <span class="tag db">MySQL 8</span>
            <strong>Database (:3306)</strong>
            <span>Persistent Volume</span>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer">
        <p>© 2026 Angular + Node Starter Template. Free & Open Source under MIT License.</p>
      </footer>
    </div>
  `,
  styles: [`
    .landing-container {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      color: #1e293b;
      background: linear-gradient(180deg, #f8fafc 0%, #edf2f7 100%);
      min-height: 100vh;
    }
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.25rem 2.5rem;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(10px);
      position: sticky;
      top: 0;
      z-index: 100;
      border-bottom: 1px solid #e2e8f0;
    }
    .logo {
      font-size: 1.25rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .badge {
      background: #dd0031;
      color: white;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.15rem 0.4rem;
      border-radius: 4px;
    }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    .nav-links a {
      text-decoration: none;
      color: #475569;
      font-weight: 500;
      transition: color 0.2s;
    }
    .nav-links a:hover {
      color: #0f172a;
    }
    .btn {
      padding: 0.6rem 1.2rem;
      border-radius: 8px;
      font-weight: 600;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      cursor: pointer;
    }
    .btn-primary { background: #2563eb; color: white; }
    .btn-primary:hover { background: #1d4ed8; }
    .btn-secondary { background: #e2e8f0; color: #1e293b; }
    .btn-secondary:hover { background: #cbd5e1; }
    
    .hero {
      text-align: center;
      padding: 5rem 1.5rem 4rem;
      max-width: 900px;
      margin: 0 auto;
    }
    .chip {
      display: inline-block;
      padding: 0.4rem 1rem;
      background: #dbeafe;
      color: #1e40af;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
    }
    .hero h1 {
      font-size: 3rem;
      font-weight: 800;
      letter-spacing: -0.025em;
      line-height: 1.2;
      color: #0f172a;
      margin-bottom: 1.25rem;
    }
    .hero p {
      font-size: 1.25rem;
      color: #475569;
      margin-bottom: 2.5rem;
      line-height: 1.6;
    }
    .cta-group {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    .btn-hero-primary {
      background: #2563eb;
      color: white;
      font-size: 1.1rem;
      padding: 0.85rem 1.75rem;
      box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
    }
    .btn-hero-primary:hover {
      background: #1d4ed8;
      transform: translateY(-2px);
    }
    .btn-hero-outline {
      border: 1px solid #cbd5e1;
      background: white;
      color: #334155;
      font-size: 1.1rem;
      padding: 0.85rem 1.75rem;
    }
    .btn-hero-outline:hover {
      background: #f8fafc;
      border-color: #94a3b8;
    }

    .features-section {
      max-width: 1200px;
      margin: 0 auto;
      padding: 4rem 1.5rem;
      text-align: center;
    }
    .features-section h2 { font-size: 2rem; color: #0f172a; margin-bottom: 0.5rem; }
    .subtitle { color: #64748b; font-size: 1.1rem; margin-bottom: 3rem; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.75rem;
    }
    .card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      text-align: left;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 20px -5px rgba(0, 0, 0, 0.08);
    }
    .card-icon { font-size: 2.25rem; margin-bottom: 1rem; }
    .card h3 { font-size: 1.2rem; color: #0f172a; margin-bottom: 0.5rem; }
    .card p { color: #64748b; font-size: 0.95rem; line-height: 1.5; }

    .architecture-section {
      max-width: 950px;
      margin: 2rem auto 5rem;
      padding: 0 1.5rem;
      text-align: center;
    }
    .arch-box {
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: white;
      padding: 2rem;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      margin-top: 1.5rem;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .arch-node {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
    }
    .arch-node strong { color: #0f172a; }
    .arch-node span { font-size: 0.85rem; color: #64748b; }
    .arch-arrow { color: #3b82f6; font-weight: bold; font-size: 1.1rem; }
    .tag {
      font-size: 0.75rem;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-weight: 700;
    }
    .tag.frontend { background: #fee2e2; color: #991b1b; }
    .tag.backend { background: #dcfce7; color: #166534; }
    .tag.db { background: #e0f2fe; color: #075985; }

    .footer {
      text-align: center;
      padding: 2.5rem 1rem;
      border-top: 1px solid #e2e8f0;
      color: #64748b;
      font-size: 0.9rem;
      background: white;
    }
  `],
})
export class LandingComponent {
  authService = inject(AuthService);

  techFeatures = [
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
    {
      icon: '🔄',
      title: 'Dev Proxy Ready',
      description: 'Integrated proxy.conf.json forwarding local Angular /api requests directly to backend container.',
    },
  ];
}
