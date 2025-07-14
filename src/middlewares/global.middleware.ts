import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/app-error';

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message =
    err instanceof AppError ? err.message : 'Something went wrong, please try again later.';

  res.status(statusCode).json({
    status: 'error',
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
