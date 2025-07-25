import { Router } from 'express';
import * as todoController from '../controllers/todoController';
import { createTodoValidation, updateTodoValidation } from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);
router.get('/', todoController.getAllTodos);
router.post('/', createTodoValidation, todoController.createNewTodo);
router.put('/:id', updateTodoValidation, todoController.updateExistingTodo);
router.delete('/:id', todoController.removeExistingTodo);

export default router;
