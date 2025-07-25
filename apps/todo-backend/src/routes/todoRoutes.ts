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

router.use(authenticateToken);
router.get('/', getAllTodos);
router.post('/', createTodoValidation, createNewTodo);
router.put('/:id', updateTodoValidation, updateExistingTodo);
router.delete('/:id', removeExistingTodo);

export default router;
