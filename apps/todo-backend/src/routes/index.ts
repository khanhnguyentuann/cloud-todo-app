import { Router } from 'express';
import todoRoutes from './todo';
import authRoutes from './auth';
import notificationRoutes from './notification';

const router = Router();

router.use('/todos', todoRoutes);
router.use('/notifications', notificationRoutes);
router.use('/', authRoutes);

export default router;
