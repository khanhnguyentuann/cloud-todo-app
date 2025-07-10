import { Button } from "@/components/common/Button"
import type { Notification, NotificationPanelProps } from "@/types"
import { X, Check, Clock, Star, Trash2 } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"

export function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
    const { t } = useTranslation()
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: 1,
            type: "reminder",
            title: t("reminder"),
            message: "Đi đánh bóng chày - Due today",
            time: "2 minutes ago",
            isRead: false,
            isImportant: true,
        },
        {
            id: 2,
            type: "task",
            title: t("taskCompleted"),
            message: "Mua sắm cuối tuần has been completed",
            time: "1 hour ago",
            isRead: false,
        },
        {
            id: 3,
            type: "system",
            title: t("systemUpdate"),
            message: "New features are now available in your To Do app",
            time: "3 hours ago",
            isRead: true,
        },
        {
            id: 4,
            type: "reminder",
            title: t("reminder"),
            message: "Hoàn thành báo cáo - Due tomorrow",
            time: "1 day ago",
            isRead: true,
        },
    ])

    if (!isOpen) return null

    const unreadCount = notifications.filter((n) => !n.isRead).length

    const markAsRead = (id: number) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
        )
    }

    const markAllAsRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
    }

    const deleteNotification = (id: number) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id))
    }

    const getNotificationIcon = (type: string, isImportant?: boolean) => {
        switch (type) {
            case "reminder":
                return <Clock className={`h-4 w-4 ${isImportant ? "text-red-500" : "text-blue-500"}`} />
            case "task":
                return <Check className="h-4 w-4 text-green-500" />
            case "system":
                return <Star className="h-4 w-4 text-orange-500 dark:text-blue-400" />
            default:
                return <Clock className="h-4 w-4 text-gray-500" />
        }
    }

    return (
        <div className="fixed inset-0 z-50" onClick={onClose}>
            <div className="lg:hidden absolute inset-0 bg-black bg-opacity-30" />

            <div
                className="absolute top-16 right-4 w-full max-w-sm lg:w-96 bg-white dark:bg-gray-700 rounded-lg shadow-xl border border-amber-300 dark:border-gray-600 max-h-[80vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-amber-300 dark:border-gray-600">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{t("notifications")}</h2>
                        {unreadCount > 0 && (
                            <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {unreadCount}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        {unreadCount > 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={markAllAsRead}
                                className="text-orange-500 dark:text-blue-400 hover:bg-orange-50 dark:hover:bg-gray-600 text-xs"
                            >
                                {t("markAllRead")}
                            </Button>
                        )}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Notifications List */}
                <div className="flex-1 overflow-y-auto">
                    {notifications.length === 0 ? (
                        <div className="p-8 text-center">
                            <Clock className="h-12 w-12 mx-auto mb-3 opacity-50 text-gray-400" />
                            <p className="text-gray-500 dark:text-gray-400">{t("noNotifications")}</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-amber-200 dark:divide-gray-600">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`p-4 hover:bg-amber-50 dark:hover:bg-gray-600 transition-colors ${!notification.isRead ? "bg-blue-50 dark:bg-blue-900/20" : ""
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 mt-1">
                                            {getNotificationIcon(notification.type, notification.isImportant)}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h4
                                                        className={`text-sm font-medium ${!notification.isRead ? "text-gray-900 dark:text-gray-100" : "text-gray-700 dark:text-gray-300"}`}
                                                    >
                                                        {notification.title}
                                                    </h4>
                                                    <p
                                                        className={`text-sm mt-1 ${!notification.isRead ? "text-gray-700 dark:text-gray-200" : "text-gray-500 dark:text-gray-400"}`}
                                                    >
                                                        {notification.message}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                                                </div>

                                                <div className="flex items-center gap-1 ml-2">
                                                    {!notification.isRead && (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => markAsRead(notification.id)}
                                                            className="text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-1 h-auto"
                                                            title={t("markAsRead")}
                                                        >
                                                            <Check className="h-3 w-3" />
                                                        </Button>
                                                    )}
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => deleteNotification(notification.id)}
                                                        className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 h-auto"
                                                        title={t("deleteNotification")}
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {notifications.length > 0 && (
                    <div className="p-3 border-t border-amber-300 dark:border-gray-600">
                        <Button
                            variant="ghost"
                            className="w-full text-orange-500 dark:text-blue-400 hover:bg-orange-50 dark:hover:bg-gray-600 text-sm"
                        >
                            {t("viewAllNotifications")}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
