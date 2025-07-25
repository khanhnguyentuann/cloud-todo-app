const jwt = require('jsonwebtoken');
import { IUser } from '@/models/User';
import { AppError } from '@/middleware/errorHandler';
import { HTTP } from '@/constants/httpStatus';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export interface JWTPayload {
    userId: string;
    email: string;
    username: string;
}

export const generateToken = (user: IUser): string => {
    const payload: JWTPayload = {
        userId: (user._id as any).toString(),
        email: user.email,
        username: user.username
    };

    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    });
};

export const verifyToken = (token: string): JWTPayload => {
    try {
        return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            throw new AppError('Token expired', HTTP.UNAUTHORIZED);
        } else if (error.name === 'JsonWebTokenError') {
            throw new AppError('Invalid token', HTTP.UNAUTHORIZED);
        } else {
            throw new AppError('Authentication error', HTTP.UNAUTHORIZED);
        }
    }
};

export const extractTokenFromHeader = (authHeader: string | undefined): string => {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new AppError('No token provided', HTTP.UNAUTHORIZED);
    }

    return authHeader.substring(7); // Remove 'Bearer ' prefix
};
