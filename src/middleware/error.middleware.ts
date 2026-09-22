import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/app-error.js';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const status = err instanceof AppError ? err.status : 500;
  if (status === 500) console.error(err);
  res.status(status).json({ message: err.message || 'Internal server error' });
}
