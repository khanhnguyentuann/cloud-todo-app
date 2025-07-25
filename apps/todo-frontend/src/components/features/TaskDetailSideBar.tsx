import React, { useState } from "react";
import { Button } from "@/components/common/Button";
import type { TaskDetailSidebarProps } from "@/types";
import { X, Calendar, Bell, RotateCcw, Star, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { formatTimeAgo } from "@/utils/formatDate";
import { DueDateMenu } from "@/components/features/DueDateMenu";
import { ReminderMenu } from "@/components/features/ReminderMenu";
import { RepeatMenu } from "@/components/features/RepeatMenu";
import { useTaskContext } from "@/context/taskContext";
import { Input } from "@/components/common/Input";

export const TaskDetailSidebar: React.FC<TaskDetailSidebarProps> = ({
    isOpen,
    onClose,
    task,
    isMobile,
}) => {
    const { updateTask, toggleImportant, deleteTask } = useTaskContext();
    const [dueDateMenuOpen, setDueDateMenuOpen] = useState(false);
    const [reminderMenuOpen, setReminderMenuOpen] = useState(false);
    const [repeatMenuOpen, setRepeatMenuOpen] = useState(false);
    const { t } = useTranslation();

    if (!isMobile && !isOpen) return null;
    if (!task) return null;

    return (
        <>
            <aside
                className={`
                    ${isMobile
                        ? "fixed top-16 h-[calc(100vh-4rem)]"
                        : "absolute inset-y-0 h-full"
                    }
                    right-0 z-40 w-64 bg-white dark:bg-gray-800 border-l border-amber-300 dark:border-gray-700 flex flex-col transform transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "translate-x-full"}
                    `}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-amber-300 dark:border-gray-700">
                    <h2 className="font-semibold text-gray-800 dark:text-gray-200">
                        {t("taskDetails")}
                    </h2>
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
                                <svg
                                    className="w-3 h-3 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </button>
                        <div className="flex-1">
                            <Input
                                value={task.title}
                                onChange={(e) => updateTask(task.id, { title: e.target.value })}
                                className={`text-base font-medium border-none focus:ring-0 p-0 ${task.completed
                                    ? "line-through text-gray-500 dark:text-gray-400"
                                    : "text-gray-800 dark:text-gray-200"
                                    }`}
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-orange-500 dark:text-blue-400 hover:bg-amber-100 dark:hover:bg-gray-700"
                            onClick={() => toggleImportant(task.id)}
                        >
                            <Star
                                className={`h-4 w-4 mr-2 ${task.isImportant ? "fill-current" : ""
                                    }`}
                            />
                            {task.isImportant
                                ? t("removeFromImportant")
                                : t("markAsImportant")}
                        </Button>

                        <DueDateMenu
                            isOpen={dueDateMenuOpen}
                            onOpenChange={setDueDateMenuOpen}
                            onDateSelect={(date) => updateTask(task.id, { dueDate: date })}
                            trigger={
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start text-orange-500 dark:text-blue-400 hover:bg-amber-100 dark:hover:bg-gray-700"
                                >
                                    <Calendar className="h-4 w-4 mr-2" />
                                    {task.dueDate ? `${t("due")}: ${task.dueDate}` : t("addDueDate")}
                                </Button>
                            }
                        />

                        <ReminderMenu
                            isOpen={reminderMenuOpen}
                            onOpenChange={setReminderMenuOpen}
                            onReminderSelect={(reminder) => updateTask(task.id, { reminder })}
                            trigger={
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start text-orange-500 dark:text-blue-400 hover:bg-amber-100 dark:hover:bg-gray-700"
                                >
                                    <Bell className="h-4 w-4 mr-2" />
                                    {task.reminder ? task.reminder : t("addReminder")}
                                </Button>
                            }
                        />

                        <RepeatMenu
                            isOpen={repeatMenuOpen}
                            onOpenChange={setRepeatMenuOpen}
                            onRepeatSelect={(repeat) => updateTask(task.id, { repeat })}
                            trigger={
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start text-orange-500 dark:text-blue-400 hover:bg-amber-100 dark:hover:bg-gray-700"
                                >
                                    <RotateCcw className="h-4 w-4 mr-2" />
                                    {task.repeat ? task.repeat : t("addRepeat")}
                                </Button>
                            }
                        />
                    </div>

                    {/* Metadata */}
                    <div className="pt-4 border-t border-amber-300 dark:border-gray-700">
                        <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                            <div>
                                {t("created")}: {task.createdAt ? formatTimeAgo(task.createdAt) : t("today")}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-amber-300 dark:border-gray-700">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={() => deleteTask(task.id)}
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        {t("deleteTask")}
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
