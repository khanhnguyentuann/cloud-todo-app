import { Request, Response } from 'express';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../lib/services/todoService';
import { CreateTodoRequest, UpdateTodoRequest } from '../types/todo';
import { AppError, asyncHandler } from '../middleware/errorHandler';
import { AuthenticatedRequest } from '../middleware/auth';

export const getAllTodos = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const todos = await getTodos(userId);
  
  res.status(200).json({
    success: true,
    data: todos,
    count: todos.length
  });
});

export const createNewTodo = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const todoData: CreateTodoRequest = req.body;
  const userId = req.user!.id;
  
  const newTodo = await createTodo({ ...todoData, userId });
  
  res.status(201).json({
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
    throw new AppError('Todo not found or access denied', 404);
  }
  
  res.status(200).json({
    success: true,
    data: updatedTodo
  });
});

export const removeExistingTodo = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.id;
  
  const deleted = await deleteTodo(id, userId);
  
  if (!deleted) {
    throw new AppError('Todo not found or access denied', 404);
  }
  
  res.status(200).json({
    success: true,
    message: 'Todo deleted successfully'
  });
});
