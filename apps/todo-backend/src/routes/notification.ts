import { Router } from 'express';
import {
    getUserNotifications,
    markAsRead,
    markAllAsRead,
    removeNotification
} from '@/controllers/notificationController';
import { authenticateToken } from '@/middleware/auth';

const router = Router();

router.use(authenticateToken);
router.get('/', getUserNotifications);
router.put('/:id/read', markAsRead);
router.put('/read-all', markAllAsRead);
router.delete('/:id', removeNotification);

export default router;
