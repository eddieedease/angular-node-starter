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
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
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

    app.listen(PORT, () => {
      console.log(`[Server] Express server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('[Server] Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
