import { Request, Response } from 'express';
import { createUser, authenticateUser, RegisterUserRequest, LoginUserRequest } from '../lib/services/userService';
import { generateToken } from '../lib/utils/jwt';
import { AppError, asyncHandler } from '../middleware/errorHandler';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const userData: RegisterUserRequest = req.body;
  
  const user = await createUser(userData);
  const token = generateToken(user);
  
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user,
      token
    }
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const loginData: LoginUserRequest = req.body;
  
  const user = await authenticateUser(loginData);
  const token = generateToken(user);
  
  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      user,
      token
    }
  });
});

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError('User not authenticated', 401);
  }
  
  res.status(200).json({
    success: true,
    data: {
      user: req.user
    }
  });
});

export const getDemoUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    // Demo user credentials
    const demoEmail = 'demo@example.com';
    const demoUsername = 'demo';
    const demoPassword = 'demo123';

    let demoUser;

    try {
      // Try to authenticate existing demo user
      console.log('🔍 Checking for existing demo user...');
      demoUser = await authenticateUser({
        email: demoEmail,
        password: demoPassword
      });
      console.log('✅ Demo user already exists, logging in...');
    } catch (authError) {
      // If authentication fails, create the demo user
      console.log('🔧 Demo user not found or authentication failed, creating demo user...');
      demoUser = await createUser({
        username: demoUsername,
        email: demoEmail,
        password: demoPassword
      });
      console.log('✅ Demo user created successfully');
    }

    // Generate token for demo user
    const token = generateToken(demoUser);
    
    res.status(200).json({
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
  } catch (error) {
    console.error('❌ Demo user login failed:', error);
    throw new AppError('Failed to login demo user', 500);
  }
});
