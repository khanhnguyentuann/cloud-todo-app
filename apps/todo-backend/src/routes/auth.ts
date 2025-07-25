import { Router } from 'express';
import * as authController from '@/controllers/authController';
import { registerValidation, loginValidation } from '@/middleware/validation';
import { authenticateToken } from '@/middleware/auth';

const router = Router();

router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);
router.get('/profile', authenticateToken, authController.getProfile);

export default router;
