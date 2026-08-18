import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import { checkDbConnection } from './config/db.js';
import { initDatabaseAndSeed } from './seeders/seed.js';

import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import healthRoutes from './routes/health.routes.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Dynamic CORS configuration allowing local dev and production domain
const allowedOrigins = [
  'http://localhost:4200',
  'http://127.0.0.1:4200',
  'https://easetest.nl',
  'https://www.easetest.nl',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Root Endpoint
app.get('/', (_req, res) => {
  res.json({ message: 'Angular Node Starter API is running.' });
});

// Startup sequence
async function startServer() {
  try {
    console.log('[Server] Initializing database connection...');
    await checkDbConnection();
    await initDatabaseAndSeed();

    // Bind explicitly to 0.0.0.0 so Docker / Traefik reverse proxy can connect
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`[Server] Express server running on http://0.0.0.0:${PORT}`);
    });
  } catch (err) {
    console.error('[Server] Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
