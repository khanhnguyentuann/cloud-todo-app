import { Response } from 'express';
import * as notificationService from '@/lib/services/notificationService';
import { AppError, asyncHandler } from '@/middleware/errorHandler';
import { AuthenticatedRequest } from '@/middleware/auth';
import { HTTP } from '@/lib/constants/httpStatus';

export const getUserNotifications = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const notifications = await notificationService.getNotifications(userId);
    res.status(HTTP.OK).json({ success: true, data: notifications });
});

export const markAsRead = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;
    const notification = await notificationService.markNotificationAsRead(id, userId);
    if (!notification) {
        throw new AppError('Notification not found', HTTP.NOT_FOUND);
    }
    res.status(HTTP.OK).json({ success: true, data: notification });
});

export const markAllAsRead = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    await notificationService.markAllNotificationsAsRead(userId);
    res.status(HTTP.OK).json({ success: true, message: 'All notifications marked as read' });
});

export const removeNotification = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;
    const deleted = await notificationService.deleteNotification(id, userId);
    if (!deleted) {
        throw new AppError('Notification not found', HTTP.NOT_FOUND);
    }
    res.status(HTTP.OK).json({ success: true, message: 'Notification deleted' });
});
