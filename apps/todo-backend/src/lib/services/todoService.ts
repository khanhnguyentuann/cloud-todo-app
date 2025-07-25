import TodoModel from '../models/Todo';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from '../../types/todo';
import { AppError } from '../../middleware/errorHandler';

export async function getTodos(userId?: string): Promise<Todo[]> {
  try {
    const filter = userId ? { userId } : {};
    const todos = await TodoModel.find(filter).sort({ createdAt: -1 });
    return todos.map(todo => ({
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      dueDate: todo.dueDate,
      reminder: todo.reminder,
      repeat: todo.repeat,
      isImportant: todo.isImportant,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    }));
  } catch (error) {
    console.error('🚨 Error getting todos:', error);
    throw new AppError('Failed to retrieve todos', 500);
  }
}

export async function createTodo(todoData: CreateTodoRequest & { userId: string }): Promise<Todo> {
  try {
    const id = Date.now().toString();
    const now = new Date().toISOString();

    const todo = new TodoModel({
      id,
      title: todoData.title,
      completed: false,
      dueDate: todoData.dueDate || null,
      reminder: todoData.reminder || null,
      repeat: todoData.repeat || null,
      isImportant: todoData.isImportant || false,
      userId: todoData.userId,
      createdAt: now,
      updatedAt: now,
    });

    const savedTodo = await todo.save();
    
    return {
      id: savedTodo.id,
      title: savedTodo.title,
      completed: savedTodo.completed,
      dueDate: savedTodo.dueDate,
      reminder: savedTodo.reminder,
      repeat: savedTodo.repeat,
      isImportant: savedTodo.isImportant,
      createdAt: savedTodo.createdAt,
      updatedAt: savedTodo.updatedAt,
    };
  } catch (error) {
    console.error('🚨 Error creating todo:', error);
    throw new AppError('Failed to create todo', 500);
  }
}

export async function updateTodo(id: string, updates: UpdateTodoRequest, userId?: string): Promise<Todo | null> {
  try {
    const now = new Date().toISOString();
    const filter: any = { id };
    if (userId) {
      filter.userId = userId;
    }
    
    const updatedTodo = await TodoModel.findOneAndUpdate(
      filter,
      { ...updates, updatedAt: now },
      { new: true }
    );

    if (!updatedTodo) {
      throw new AppError('Todo not found or access denied', 404);
    }

    return {
      id: updatedTodo.id,
      title: updatedTodo.title,
      completed: updatedTodo.completed,
      dueDate: updatedTodo.dueDate,
      reminder: updatedTodo.reminder,
      repeat: updatedTodo.repeat,
      isImportant: updatedTodo.isImportant,
      createdAt: updatedTodo.createdAt,
      updatedAt: updatedTodo.updatedAt,
    };
  } catch (error) {
    console.error('🚨 Error updating todo:', error);
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to update todo', 500);
  }
}

export async function deleteTodo(id: string, userId?: string): Promise<boolean> {
  try {
    const filter: any = { id };
    if (userId) {
      filter.userId = userId;
    }
    
    const deletedTodo = await TodoModel.findOneAndDelete(filter);
    
    if (!deletedTodo) {
      throw new AppError('Todo not found or access denied', 404);
    }
    
    return true;
  } catch (error) {
    console.error('🚨 Error deleting todo:', error);
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to delete todo', 500);
  }
}
