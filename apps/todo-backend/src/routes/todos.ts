import { Router } from 'express';
import * as todoController from '../controllers/todoController';
import { createTodoValidation, updateTodoValidation } from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Apply authentication to all todo routes
router.use(authenticateToken);

/**
 * @route   GET /api/todos
 * @desc    Get all todos for the authenticated user
 * @access  Private
 */
router.get('/', todoController.getAllTodos);

/**
 * @route   POST /api/todos
 * @desc    Create a new todo for the authenticated user
 * @access  Private
 */
router.post('/', createTodoValidation, todoController.createNewTodo);

/**
 * @route   PUT /api/todos/:id
 * @desc    Update a todo by ID for the authenticated user
 * @access  Private
 */
router.put('/:id', updateTodoValidation, todoController.updateExistingTodo);

/**
 * @route   DELETE /api/todos/:id
 * @desc    Delete a todo by ID for the authenticated user
 * @access  Private
 */
router.delete('/:id', todoController.removeExistingTodo);

export default router;
