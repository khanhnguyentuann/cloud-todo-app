import { Button } from "@/components/common/Button"
import type { NotificationPanelProps } from "@/types"
import { X, Check, Clock, Star, Trash2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useTaskContext } from "@/context/taskContext"
import { formatTimeAgo } from "@/utils/formatDate"

export function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
    const { t } = useTranslation()
    const { notifications, markAsRead, markAllAsRead, deleteNotification } = useTaskContext()

    if (!isOpen) return null

    const unreadCount = notifications.filter((n) => !n.read).length

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case "reminder":
                return <Clock className="h-4 w-4 text-theme-info" />
            case "taskCompleted":
                return <Check className="h-4 w-4 text-theme-success" />
            case "systemUpdate":
                return <Star className="h-4 w-4 text-theme-warning" />
            default:
                return <Clock className="h-4 w-4 text-theme-text-muted" />
        }
    }

    return (
        <div className="fixed inset-0 z-50" onClick={onClose}>
            <div className="lg:hidden absolute inset-0 bg-black/20 dark:bg-black/40" />

            <div
                className="absolute top-16 right-2 sm:right-4 w-[calc(100vw-1rem)] max-w-sm sm:max-w-md lg:w-96 bg-theme-surface dark:bg-theme-surface rounded-xl shadow-2xl border border-theme-border dark:border-theme-border max-h-[calc(100vh-5rem)] overflow-hidden flex flex-col backdrop-blur-sm"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Sticky Header */}
                <div className="sticky top-0 z-10 bg-theme-surface dark:bg-theme-surface flex items-center justify-between p-4 border-b border-theme-border dark:border-theme-border backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                        <h2 className="text-lg font-semibold text-theme-text-primary dark:text-theme-text-primary">{t("notifications")}</h2>
                        {unreadCount > 0 && (
                            <span className="bg-theme-error text-theme-error-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-sm">
                                {unreadCount}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-1">
                        {unreadCount > 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={markAllAsRead}
                                className="text-theme-primary hover:bg-theme-surface-hover dark:hover:bg-theme-surface-hover text-xs px-3 py-1.5 rounded-lg transition-all duration-200"
                            >
                                {t("markAllRead")}
                            </Button>
                        )}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            className="text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-surface-hover dark:hover:bg-theme-surface-hover p-1.5 rounded-lg transition-all duration-200"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Notifications List */}
                <div className="flex-1 overflow-y-auto">
                    {notifications.length === 0 ? (
                        <div className="p-8 text-center">
                            <Clock className="h-12 w-12 mx-auto mb-4 opacity-40 text-theme-text-muted" />
                            <p className="text-theme-text-secondary font-medium">{t("noNotifications")}</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-theme-border/50 dark:divide-theme-border/50">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`p-4 hover:bg-theme-surface-hover dark:hover:bg-theme-surface-hover transition-all duration-200 ${!notification.read ? "bg-theme-surface-active dark:bg-theme-surface-active border-l-2 border-l-theme-primary" : ""
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 mt-0.5 p-1.5 rounded-lg bg-theme-surface-hover dark:bg-theme-surface-hover">
                                            {getNotificationIcon(notification.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex-1 min-w-0">
                                                    <h4
                                                        className={`text-sm font-semibold leading-tight ${!notification.read ? "text-theme-text-primary" : "text-theme-text-secondary"}`}
                                                    >
                                                        {t(notification.type)}
                                                    </h4>
                                                    <p
                                                        className={`text-sm mt-1 leading-relaxed break-words ${!notification.read ? "text-theme-text-secondary" : "text-theme-text-muted"}`}
                                                    >
                                                        {notification.message}
                                                    </p>
                                                    <p className="text-xs text-theme-text-muted mt-2 font-medium">{formatTimeAgo(notification.createdAt)}</p>
                                                </div>

                                                <div className="flex items-center gap-1 flex-shrink-0">
                                                    {!notification.read && (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => markAsRead(notification.id)}
                                                            className="text-theme-success hover:bg-theme-success/10 p-1.5 h-auto rounded-lg transition-all duration-200"
                                                            title={t("markAsRead")}
                                                        >
                                                            <Check className="h-3.5 w-3.5" />
                                                        </Button>
                                                    )}
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => deleteNotification(notification.id)}
                                                        className="text-theme-error hover:bg-theme-error/10 p-1.5 h-auto rounded-lg transition-all duration-200"
                                                        title={t("deleteNotification")}
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
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
                    <div className="p-3 border-t border-theme-border dark:border-theme-border bg-theme-surface dark:bg-theme-surface">
                        <Button
                            variant="ghost"
                            className="w-full text-theme-primary hover:bg-theme-surface-hover dark:hover:bg-theme-surface-hover text-sm py-2.5 rounded-lg font-medium transition-all duration-200"
                        >
                            {t("viewAllNotifications")}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
