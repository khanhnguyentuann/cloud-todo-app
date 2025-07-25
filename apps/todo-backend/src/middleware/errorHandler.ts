import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS, HTTP } from '@/lib/constants/httpStatus';

export interface ApiError extends Error {
    statusCode?: number;
    isOperational?: boolean;
}

export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string, statusCode: number = HTTP.INTERNAL_SERVER_ERROR, isOperational: boolean = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this, this.constructor);
    }
}

export const errorHandler = (
    error: ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { statusCode = HTTP.INTERNAL_SERVER_ERROR, message } = error;

    console.error(`💥 Error ${statusCode}: ${message}`);

    if (process.env.NODE_ENV === 'development') {
        console.error(error.stack);
    }

    res.status(statusCode).json({
        success: false,
        error: {
            message,
            ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
        }
    });
};

export const notFoundHandler = (req: Request, res: Response) => {
    res.status(HTTP.NOT_FOUND).json({
        success: false,
        error: {
            message: `Route ${req.originalUrl} not found`
        }
    });
};

export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
