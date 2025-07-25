import { Router } from 'express';
import {
  getAllTodos,
  createNewTodo,
  updateExistingTodo,
  removeExistingTodo
} from '../controllers/todoController';
import { createTodoValidation, updateTodoValidation } from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Apply authentication to all todo routes
router.use(authenticateToken);

/**
 * @route   GET /api/todos
 * @desc    Get all todos for authenticated user
 * @access  Private
 */
router.get('/', getAllTodos);

/**
 * @route   POST /api/todos
 * @desc    Create a new todo for authenticated user
 * @access  Private
 */
router.post('/', createTodoValidation, createNewTodo);

/**
 * @route   PUT /api/todos/:id
 * @desc    Update a todo by ID for authenticated user
 * @access  Private
 */
router.put('/:id', updateTodoValidation, updateExistingTodo);

/**
 * @route   DELETE /api/todos/:id
 * @desc    Delete a todo by ID for authenticated user
 * @access  Private
 */
router.delete('/:id', removeExistingTodo);

export default router;
