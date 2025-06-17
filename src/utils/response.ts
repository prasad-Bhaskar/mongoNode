import { Response } from 'express';

type SuccessResponse<T = unknown> = {
  success: true;
  message: string;
  data?: T;
};

type ErrorResponse = {
  success: false;
  message: string;
  error?: unknown;
};

export function successResponse<T = unknown>(
  res: Response,
  message: string,
  data?: T,
  statusCode = 200
) {
  const result: SuccessResponse<T> = { success: true, message };
  if (data !== undefined) result.data = data;
  return res.status(statusCode).json(result);
}

export function errorResponse(res: Response, message: string, error?: unknown, statusCode = 400) {
  console.log(`Error: ${message}`, error);

  const result: ErrorResponse = { success: false, message };
  if (error !== undefined) result.error = error;
  return res.status(statusCode).json(result);
}
