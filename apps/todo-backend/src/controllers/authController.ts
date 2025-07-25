import { Request, Response } from 'express';
import {
    createUser,
    authenticateUser,
    RegisterUserRequest,
    LoginUserRequest
} from '@/services/userService';
import { getOrCreateDemoUser } from '@/services/demoUserService';
import { generateToken } from '@/utils/jwt';
import { AppError, asyncHandler } from '@/middleware/errorHandler';
import { HTTP } from '@/constants/httpStatus';

export const register = asyncHandler(async (req: Request, res: Response) => {
    const userData: RegisterUserRequest = req.body;
    const user = await createUser(userData);
    const token = generateToken(user);

    res.status(HTTP.CREATED).json({
        success: true,
        message: 'User registered successfully',
        data: { user, token }
    });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
    const loginData: LoginUserRequest = req.body;
    const user = await authenticateUser(loginData);
    const token = generateToken(user);

    res.status(HTTP.OK).json({
        success: true,
        message: 'Login successful',
        data: { user, token }
    });
});

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new AppError('User not authenticated', HTTP.UNAUTHORIZED);

    res.status(HTTP.OK).json({
        success: true,
        data: { user: req.user }
    });
});

export const getDemoUser = asyncHandler(async (_req: Request, res: Response) => {
    const demoUser = await getOrCreateDemoUser();
    const token = generateToken(demoUser);

    res.status(HTTP.OK).json({
        success: true,
        message: 'Demo user logged in successfully',
        data: {
            user: {
                _id: demoUser._id,
                username: demoUser.username,
                email: demoUser.email,
                createdAt: demoUser.createdAt,
                updatedAt: demoUser.updatedAt
            },
            token
        }
    });
});
