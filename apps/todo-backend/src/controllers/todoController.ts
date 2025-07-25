import { Request, Response } from 'express';
import { getTodos, createTodo, updateTodo, deleteTodo } from '@/lib/services/todoService';
import { CreateTodoRequest, UpdateTodoRequest } from '@/types/todo';
import { AppError, asyncHandler } from '@/middleware/errorHandler';
import { AuthenticatedRequest } from '@/middleware/auth';
import { HTTP } from '@/lib/constants/httpStatus';

export const getAllTodos = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const todos = await getTodos(userId);

    res.status(HTTP.OK).json({
        success: true,
        data: todos,
        count: todos.length
    });
});

export const createNewTodo = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const todoData: CreateTodoRequest = req.body;
    const userId = req.user!.id;

    const newTodo = await createTodo({ ...todoData, userId });

    res.status(HTTP.CREATED).json({
        success: true,
        data: newTodo
    });
});

export const updateExistingTodo = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const updates: UpdateTodoRequest = req.body;
    const userId = req.user!.id;

    const updatedTodo = await updateTodo(id, updates, userId);

    if (!updatedTodo) {
        throw new AppError('Todo not found or access denied', HTTP.NOT_FOUND);
    }

    res.status(HTTP.OK).json({
        success: true,
        data: updatedTodo
    });
});

export const removeExistingTodo = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;

    const deleted = await deleteTodo(id, userId);

    if (!deleted) {
        throw new AppError('Todo not found or access denied', HTTP.NOT_FOUND);
    }

    res.status(HTTP.OK).json({
        success: true,
        message: 'Todo deleted successfully'
    });
});
