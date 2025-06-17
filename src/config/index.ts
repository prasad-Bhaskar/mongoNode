import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || '',
  host: process.env.HOST || 'localhost',
};
export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development';

export const JWT_SECRET = process.env.JWT_SECRET!;
export const ACCESS_EXPIRES_IN = parseInt(process.env.JWT_ACCESS_EXPIRES_IN || '3600');
export const REFRESH_EXPIRES_IN = parseInt(process.env.JWT_REFRESH_EXPIRES_IN || '604800');
