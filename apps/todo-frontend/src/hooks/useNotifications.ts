import { useState, useCallback, useEffect } from 'react';
import axios from '@/lib/axios';
import { API_ENDPOINTS } from '@/store/api/endpoints';

export interface Notification {
    id: string;
    type: 'reminder' | 'taskCompleted' | 'overdue';
    message: string;
    read: boolean;
    createdAt: string;
}

export const useNotifications = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const fetchNotifications = useCallback(async () => {
        try {
            const response = await axios.get<{ data: Notification[] }>(API_ENDPOINTS.NOTIFICATION.FETCH_NOTIFICATIONS);
            setNotifications(response.data.data);
        } catch (error) {
            console.error('Failed to fetch notifications', error);
        }
    }, []);

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    const markAsRead = useCallback(async (id: string) => {
        try {
            await axios.put(API_ENDPOINTS.NOTIFICATION.MARK_AS_READ(id));
            fetchNotifications();
        } catch (error) {
            console.error('Failed to mark notification as read', error);
        }
    }, [fetchNotifications]);

    const markAllAsRead = useCallback(async () => {
        try {
            await axios.put(API_ENDPOINTS.NOTIFICATION.MARK_ALL_AS_READ);
            fetchNotifications();
        } catch (error) {
            console.error('Failed to mark all notifications as read', error);
        }
    }, [fetchNotifications]);

    const deleteNotification = useCallback(async (id: string) => {
        try {
            await axios.delete(API_ENDPOINTS.NOTIFICATION.DELETE_NOTIFICATION(id));
            fetchNotifications();
        } catch (error) {
            console.error('Failed to delete notification', error);
        }
    }, [fetchNotifications]);

    return {
        notifications,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        deleteNotification,
    };
};
