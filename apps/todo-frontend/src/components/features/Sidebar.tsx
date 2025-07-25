import { type FC } from "react";
import { Button } from "@/components/common/Button";
import { X, Star, Calendar, CheckSquare, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { useTaskContext } from "@/context/taskContext";

type SidebarProps = {
    isOpen: boolean
    onClose: () => void
    isMobile: boolean
};

export const Sidebar: FC<SidebarProps> = ({
    isOpen,
    onClose,
    isMobile
}) => {
    const { t } = useTranslation();
    const location = useLocation();
    const { tasks } = useTaskContext();

    const myDayCount = tasks.filter(task => {
        if (!task.createdAt) return false;
        const createdAt = new Date(task.createdAt);
        const today = new Date();
        return createdAt.getDate() === today.getDate() &&
            createdAt.getMonth() === today.getMonth() &&
            createdAt.getFullYear() === today.getFullYear();
    }).length;

    const importantCount = tasks.filter(task => task.isImportant).length;
    const plannedCount = tasks.filter(task => task.dueDate).length;
    const tasksCount = tasks.length;

    const sidebarItems = [
        { icon: Sun, key: "myDay", count: myDayCount, path: "/my-day" },
        { icon: Star, key: "important", count: importantCount, path: "/important" },
        { icon: Calendar, key: "planned", count: plannedCount, path: "/planned" },
        { icon: CheckSquare, key: "tasks", count: tasksCount, path: "/tasks" },
    ];

    if (!isMobile && !isOpen) return null;

    return (
        <>
            <aside
                className={`
                    ${isMobile ? "fixed top-16 h-[calc(100vh-4rem)]" : "relative"} inset-y-0 left-0 z-40 w-64
                    bg-theme-surface dark:bg-theme-surface border-r border-theme-border dark:border-theme-border
                    flex flex-col transform transition-transform duration-300 ease-in-out shadow-lg
                    ${isOpen ? "translate-x-0" : isMobile ? "-translate-x-full" : "translate-x-0"}
                `}
            >
                {isMobile && (
                    <div className="flex items-center justify-between p-4 border-b border-theme-border dark:border-theme-border">
                        <h2 className="font-semibold text-theme-text-primary dark:text-theme-text-primary">{t("menu")}</h2>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            className="text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-surface-hover dark:hover:bg-theme-surface-hover rounded-lg transition-all duration-200"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                )}

                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        {sidebarItems.map((item) => {
                            const label = t(item.key);
                            const isActive = location.pathname === item.path;

                            return (
                                <li key={item.key}>
                                    <Link
                                        to={item.path}
                                        onClick={() => { if (isMobile) onClose(); }}
                                        className={`
                                            w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all duration-200 font-medium
                                            ${isActive
                                                ? "bg-theme-surface-active dark:bg-theme-surface-active text-theme-primary dark:text-theme-primary border-l-2 border-l-theme-primary shadow-sm"
                                                : "text-theme-text-primary dark:text-theme-text-primary hover:bg-theme-surface-hover dark:hover:bg-theme-surface-hover"
                                            }
                                        `}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon className="h-5 w-5" />
                                            <span>{label}</span>
                                        </div>
                                        {item.count > 0 && (
                                            <span className="text-xs bg-theme-primary text-theme-primary-foreground px-2.5 py-1 rounded-full font-semibold shadow-sm">
                                                {item.count}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </aside>

            {isMobile && isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 dark:bg-black/40 z-30 backdrop-blur-sm"
                    onClick={onClose}
                />
            )}
        </>
    );
};
