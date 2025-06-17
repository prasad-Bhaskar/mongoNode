import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/auth.service';
import { errorResponse } from '../utils/response';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ success: false, message: 'Unauthorized' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
}

export const validateRegister = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return errorResponse(res, 'Name is required and must be a non-empty string', null, 400);
  }

  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return errorResponse(res, 'Valide email is required', null, 400);
  }
  // Password validation
  if (!password || typeof password !== 'string') {
    return errorResponse(res, 'password feild is required', null, 400);
  }

  if (password.length < 6 || password.length > 64) {
    return errorResponse(res, 'Password must be between 6 and 64 characters', null, 400);
  }
  next();
};
