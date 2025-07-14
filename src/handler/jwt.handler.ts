import jwt from 'jsonwebtoken';
import { ACCESS_EXPIRES_IN, JWT_SECRET, REFRESH_EXPIRES_IN } from '../config';

export interface JwtPayload {
  user_id: string;
  email: string;
  name: string;
  device: string;
  server?: string;
}

/**
 * Generate JWT token
 */
export function generateToken(payload: JwtPayload): object {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: ACCESS_EXPIRES_IN,
    algorithm: 'HS256',
  });
  const refreshToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: REFRESH_EXPIRES_IN,
    algorithm: 'HS256',
  });
  return {
    access_token: token,
    refresh_token: refreshToken,
    token_expiry: ACCESS_EXPIRES_IN,
    refresh_token_expiry: REFRESH_EXPIRES_IN,
  };
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
