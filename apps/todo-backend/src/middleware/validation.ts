import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { AppError } from '@/middleware/errorHandler';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error: any) => error.msg).join(', ');
        throw new AppError(`Validation error: ${errorMessages}`, 400);
    }
    next();
};

// Auth validation
export const registerValidation = [
    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 3, max: 30 })
        .withMessage('Username must be between 3 and 30 characters')
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('Username can only contain letters, numbers, and underscores'),
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
    validateRequest
];

export const loginValidation = [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
    validateRequest
];

// Todo validation
export const createTodoValidation = [
    body('title')
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 1, max: 255 })
        .withMessage('Title must be between 1 and 255 characters'),
    body('dueDate')
        .optional({ nullable: true })
        .custom((value) => {
            if (value === null || value === '' || value === undefined) return true;
            if (typeof value === 'string' && value.trim() === '') return true;
            return new Date(value).toString() !== 'Invalid Date';
        })
        .withMessage('Due date must be a valid date'),
    body('reminder')
        .optional({ nullable: true })
        .custom((value) => {
            if (value === null || value === '' || value === undefined) return true;
            if (typeof value === 'string' && value.trim() === '') return true;
            return new Date(value).toString() !== 'Invalid Date';
        })
        .withMessage('Reminder must be a valid date'),
    body('repeat')
        .optional({ nullable: true }),
    body('isImportant')
        .optional()
        .isBoolean()
        .withMessage('isImportant must be a boolean'),
    validateRequest
];

export const updateTodoValidation = [
    body('title')
        .optional()
        .isLength({ min: 1, max: 255 })
        .withMessage('Title must be between 1 and 255 characters'),
    body('completed')
        .optional()
        .isBoolean()
        .withMessage('Completed must be a boolean'),
    body('dueDate')
        .optional({ nullable: true })
        .custom((value) => {
            if (value === null || value === '' || value === undefined) return true;
            if (typeof value === 'string' && value.trim() === '') return true;
            return new Date(value).toString() !== 'Invalid Date';
        })
        .withMessage('Due date must be a valid date'),
    body('reminder')
        .optional({ nullable: true })
        .custom((value) => {
            if (value === null || value === '' || value === undefined) return true;
            if (typeof value === 'string' && value.trim() === '') return true;
            return new Date(value).toString() !== 'Invalid Date';
        })
        .withMessage('Reminder must be a valid date'),
    body('repeat')
        .optional({ nullable: true }),
    body('isImportant')
        .optional()
        .isBoolean()
        .withMessage('isImportant must be a boolean'),
    validateRequest
];
