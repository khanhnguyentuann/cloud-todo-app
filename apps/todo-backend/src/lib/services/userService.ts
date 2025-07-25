import User, { IUser } from '@/lib/models/User';
import { AppError } from '@/middleware/errorHandler';
import { HTTP } from '@/lib/constants/httpStatus';

export interface RegisterUserRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginUserRequest {
  email: string;
  password: string;
}

export const createUser = async (userData: RegisterUserRequest): Promise<IUser> => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        { email: userData.email },
        { username: userData.username }
      ]
    });

    if (existingUser) {
      if (existingUser.email === userData.email) {
        throw new AppError('Email already registered', HTTP.BAD_REQUEST);
      }
      if (existingUser.username === userData.username) {
        throw new AppError('Username already taken', HTTP.BAD_REQUEST);
      }
    }

    const user = new User(userData);
    await user.save();

    return user;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    console.error('🚨 Error creating user:', error);
    throw new AppError('Failed to create user', HTTP.INTERNAL_SERVER_ERROR);
  }
};

export const authenticateUser = async (loginData: LoginUserRequest): Promise<IUser> => {
  try {
    // Find user by email
    const user = await User.findOne({ email: loginData.email });

    if (!user) {
      throw new AppError('Invalid email or password', HTTP.UNAUTHORIZED);
    }

    // Check password
    const isPasswordValid = await user.comparePassword(loginData.password);

    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', HTTP.UNAUTHORIZED);
    }

    return user;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    console.error('🚨 Error authenticating user:', error);
    throw new AppError('Authentication failed', HTTP.INTERNAL_SERVER_ERROR);
  }
};

export const getUserById = async (userId: string): Promise<IUser | null> => {
  try {
    return await User.findById(userId);
  } catch (error) {
    console.error('🚨 Error getting user:', error);
    throw new AppError('Failed to get user', HTTP.INTERNAL_SERVER_ERROR);
  }
};
