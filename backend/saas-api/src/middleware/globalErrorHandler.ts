import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

/**
 * Global error handler middleware for Express applications.
 * This middleware catches errors thrown in the application and sends a standardized error response.
 * 
 * @param err - The error object, which can be an instance of AppError or any other error.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function in the stack (not used here).
 */
export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err instanceof AppError ? err.statusCode : 500; // Use AppError status code or default to 500
    console.error(err); // Log the error for debugging
    res.status(statusCode).json({ 
        message: err.message || "Internal Server Error",
        error: process.env.NODE_ENV === 'prodcution' ? undefined : err.stack // Hide stack trace in production
    });
}