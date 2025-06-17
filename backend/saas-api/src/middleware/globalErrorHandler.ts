import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err instanceof AppError ? err.statusCode : 500; // Use AppError status code or default to 500
    console.error(err); // Log the error for debugging
    res.status(statusCode).json({ 
        message: err.message || "Internal Server Error",
        error: process.env.NODE_ENV === 'prodcution' ? undefined : err.stack // Hide stack trace in production
    });
}