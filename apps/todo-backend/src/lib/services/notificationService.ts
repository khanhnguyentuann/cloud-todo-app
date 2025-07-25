import NotificationModel, { INotification } from '@/lib/models/Notification';
import { AppError } from '@/middleware/errorHandler';
import { HTTP } from '@/lib/constants/httpStatus';

export async function getNotifications(userId: string): Promise<INotification[]> {
    try {
        return await NotificationModel.find({ userId }).sort({ createdAt: -1 });
    } catch (error) {
        throw new AppError('Failed to retrieve notifications', HTTP.INTERNAL_SERVER_ERROR);
    }
}

export async function createNotification(data: Partial<INotification>): Promise<INotification> {
    try {
        const notification = new NotificationModel(data);
        return await notification.save();
    } catch (error) {
        throw new AppError('Failed to create notification', HTTP.INTERNAL_SERVER_ERROR);
    }
}

export async function markNotificationAsRead(id: string, userId: string): Promise<INotification | null> {
    try {
        return await NotificationModel.findOneAndUpdate({ _id: id, userId }, { read: true }, { new: true });
    } catch (error) {
        throw new AppError('Failed to update notification', HTTP.INTERNAL_SERVER_ERROR);
    }
}

export async function markAllNotificationsAsRead(userId: string): Promise<void> {
    try {
        await NotificationModel.updateMany({ userId, read: false }, { read: true });
    } catch (error) {
        throw new AppError('Failed to update notifications', HTTP.INTERNAL_SERVER_ERROR);
    }
}

export async function deleteNotification(id: string, userId: string): Promise<boolean> {
    try {
        const result = await NotificationModel.deleteOne({ _id: id, userId });
        return result.deletedCount > 0;
    } catch (error) {
        throw new AppError('Failed to delete notification', HTTP.INTERNAL_SERVER_ERROR);
    }
}
