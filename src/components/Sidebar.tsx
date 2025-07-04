import { type FC } from "react"
import { Button } from "@/components/ui/button"
import type { SidebarProps } from "@/types"
import { Plus, X } from "lucide-react"
import { useLanguage } from "@/hooks/UseLanguage"
import {
    Star,
    Calendar,
    UserCheck,
    CheckSquare,
    Sun,
    Flag
} from "lucide-react";

export const Sidebar: FC<SidebarProps> = ({
    isOpen,
    onClose,
    activeView,
    onViewChange,
    isMobile
}) => {

    const { t } = useLanguage()

    const sidebarItems = [
        { icon: Sun, label: t.myDay, count: 1, active: true },
        { icon: Star, label: t.important, count: 0 },
        { icon: Calendar, label: t.planned, count: 1 },
        { icon: UserCheck, label: t.assignedToMe, count: 0 },
        { icon: Flag, label: t.flaggedEmail, count: 0 },
        { icon: CheckSquare, label: t.tasks, count: 1 },
    ]
    // Desktop: không render nếu đóng
    if (!isMobile && !isOpen) return null

    return (
        <>
            <aside
                className={`
          ${isMobile ? "fixed" : "relative"} inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 border-r border-amber-300 dark:border-gray-700 flex flex-col transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : isMobile ? "-translate-x-full" : "translate-x-0"}
        `}
            >
                {/* Mobile header */}
                {isMobile && (
                    <div className="flex items-center justify-between p-4 border-b border-amber-300 dark:border-gray-700">
                        <h2 className="font-semibold text-gray-800 dark:text-gray-200">{t.menu}</h2>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                )}

                <nav className="flex-1 p-4">
                    <ul className="space-y-1">
                        {sidebarItems.map((item) => (
                            <li key={item.label}>
                                <button
                                    onClick={() => {
                                        onViewChange(item.label)
                                        if (isMobile) onClose()
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${activeView === item.label
                                        ? "bg-amber-300 dark:bg-blue-500 text-orange-600 dark:text-white font-medium"
                                        : "text-gray-800 dark:text-gray-200 hover:bg-amber-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon className="h-4 w-4" />
                                        <span>{item.label}</span>
                                    </div>
                                    {item.count > 0 && (
                                        <span className="text-xs bg-amber-300 dark:bg-blue-500 text-orange-600 dark:text-white px-2 py-0.5 rounded-full">
                                            {item.count}
                                        </span>
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="p-4 border-t border-amber-300 dark:border-gray-700">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-orange-500 dark:text-blue-400 hover:bg-amber-100 dark:hover:bg-gray-700"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        {t.newList}
                    </Button>
                </div>
            </aside>

            {/* Mobile overlay */}
            {isMobile && isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={onClose}
                />
            )}
        </>
    )
}
