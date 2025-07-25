import { Request, Response, NextFunction } from 'express';
import { verifyToken, extractTokenFromHeader, JWTPayload } from '@/utils/jwt';
import { AppError, asyncHandler } from '@/middleware/errorHandler';
import { HTTP } from '@/constants/httpStatus';

// Extend the JWTPayload interface to include id property for backwards compatibility
export interface AuthenticatedUser extends JWTPayload {
    id: string;
}

// Extend Request interface to include user info
declare global {
    namespace Express {
        interface Request {
            user?: AuthenticatedUser;
        }
    }
}

export interface AuthenticatedRequest extends Request {
    user?: AuthenticatedUser;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = extractTokenFromHeader(req.headers.authorization);
        const decoded = verifyToken(token);

        // Map userId to id for backwards compatibility
        req.user = {
            ...decoded,
            id: decoded.userId
        };
        next();
    } catch (error) {
        const message = error instanceof AppError ? error.message : 'Authentication failed';
        const statusCode = error instanceof AppError ? error.statusCode : HTTP.UNAUTHORIZED;
        throw new AppError(message, statusCode);
    }
};

export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.headers.authorization) {
            const token = extractTokenFromHeader(req.headers.authorization);
            const decoded = verifyToken(token);
            req.user = {
                ...decoded,
                id: decoded.userId
            };
        }
        next();
    } catch (error) {
        // For optional auth, we continue even if token is invalid
        next();
    }
};
