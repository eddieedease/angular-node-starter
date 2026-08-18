import { Response } from 'express';
import os from 'os';
import { pool } from '../config/db.js';
import { AuthenticatedRequest } from '../middleware/auth.js';

export async function getStats(_req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const [userRows]: any = await pool.query('SELECT COUNT(*) as count FROM users');
    const userCount = userRows[0]?.count || 0;

    const uptimeSeconds = Math.floor(process.uptime());
    const totalMemoryMB = Math.round(os.totalmem() / (1024 * 1024));
    const freeMemoryMB = Math.round(os.freemem() / (1024 * 1024));

    res.json({
      stats: {
        totalUsers: userCount,
        dbStatus: 'Healthy (Connected)',
        uptimeSeconds,
        serverTime: new Date().toISOString(),
        system: {
          platform: os.platform(),
          nodeVersion: process.version,
          totalMemoryMB,
          freeMemoryMB,
        },
        activeSessions: 1,
      },
    });
  } catch (err: any) {
    console.error('[Admin] Error fetching stats:', err);
    res.status(500).json({ error: 'Failed to fetch admin stats' });
  }
}
