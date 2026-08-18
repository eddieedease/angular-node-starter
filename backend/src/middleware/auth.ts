import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: string;
    name: string;
  };
}

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') 
    ? authHeader.split(' ')[1] 
    : req.cookies?.token;

  if (!token) {
    res.status(401).json({ error: 'Access token missing or invalid' });
    return;
  }

  const secret = process.env.JWT_SECRET || 'super-secret-jwt-key';

  jwt.verify(token, secret, (err: any, user: any) => {
    if (err) {
      res.status(403).json({ error: 'Token verification failed or expired' });
      return;
    }
    req.user = user;
    next();
  });
}
