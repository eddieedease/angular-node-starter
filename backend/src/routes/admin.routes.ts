import { Router } from 'express';
import { getStats } from '../controllers/admin.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/stats', authenticateToken, getStats);

export default router;
