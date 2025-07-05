import React from "react";
import { Button } from "@/components/ui/button";
import type { TaskDetailSidebarProps } from "@/types/components/TaskDetailSidebar";
import { X, Calendar, Bell, RotateCcw, Star, Trash2 } from "lucide-react";

export const TaskDetailSidebar: React.FC<TaskDetailSidebarProps> = ({
    isOpen,
    onClose,
    task,
    isMobile
}) => {
    // Không render sidebar khi đóng trên desktop
    if (!isMobile && !isOpen) {
        return null;
    }

    if (!task) return null;

    return (
        <>
            <aside
                className={`
                    ${isMobile ? "fixed" : "relative"} ${isMobile ? "top-16" : "inset-y-0"} right-0 z-40 w-64 ${isMobile ? "h-[calc(100vh-4rem)]" : "h-full"} bg-white dark:bg-gray-800 border-l border-amber-300 dark:border-gray-700 flex flex-col transform transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : isMobile ? "translate-x-full" : "translate-x-0"}
                    `}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-amber-300 dark:border-gray-700 flex-shrink-0">
                    <h2 className="font-semibold text-gray-800 dark:text-gray-200">Task Details</h2>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                {/* Content */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                    {/* Completed */}
                    <div className="flex items-center gap-3">
                        <button
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${task.completed
                                ? "bg-emerald-500 border-emerald-500"
                                : "border-amber-300 dark:border-gray-600 hover:border-orange-500 dark:hover:border-blue-400"
                                }`}
                        >
                            {task.completed && (
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </button>
                        <div className="flex-1">
                            <div
                                className={`text-base font-medium ${task.completed
                                    ? "line-through text-gray-500 dark:text-gray-400"
                                    : "text-gray-800 dark:text-gray-200"
                                    }`}
                            >
                                {task.text}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-orange-500 dark:text-blue-400 hover:bg-amber-100 dark:hover:bg-gray-700"
                        >
                            <Star className={`h-4 w-4 mr-2 ${task.isImportant ? "fill-current" : ""}`} />
                            {task.isImportant ? "Remove from Important" : "Mark as Important"}
                        </Button>

                        <Button
                            variant="ghost"
                            className="w-full justify-start text-orange-500 dark:text-blue-400 hover:bg-amber-100 dark:hover:bg-gray-700"
                        >
                            <Calendar className="h-4 w-4 mr-2" />
                            {task.dueDate ? `Due: ${task.dueDate}` : "Add due date"}
                        </Button>

                        <Button
                            variant="ghost"
                            className="w-full justify-start text-orange-500 dark:text-blue-400 hover:bg-amber-100 dark:hover:bg-gray-700"
                        >
                            <Bell className="h-4 w-4 mr-2" />
                            Add reminder
                        </Button>

                        <Button
                            variant="ghost"
                            className="w-full justify-start text-orange-500 dark:text-blue-400 hover:bg-amber-100 dark:hover:bg-gray-700"
                        >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Add repeat
                        </Button>
                    </div>

                    {/* Metadata */}
                    <div className="pt-4 border-t border-amber-300 dark:border-gray-700">
                        <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                            <div>Created: Today</div>
                            <div>List: Tasks</div>
                            {task.dueDate && <div>Due: {task.dueDate}</div>}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-amber-300 dark:border-gray-700 flex-shrink-0">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete task
                    </Button>
                </div>
            </aside>

            {/* Overlay */}
            {isMobile && isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={onClose}
                />
            )}
        </>
    );
};
