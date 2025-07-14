import type { TaskItemProps } from "@/types"
import { Star, CalendarDays, Clock } from "lucide-react"
import { useTranslation } from "react-i18next"

export function TaskItem({ task, onToggle, onToggleImportant, onTaskSelect }: TaskItemProps) {
    const { t } = useTranslation()

    return (
        <div
            className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-600 transition-colors group bg-white dark:bg-gray-700 border border-amber-300 dark:border-gray-600 hover:border-amber-400 dark:hover:border-gray-500 cursor-pointer"
            onClick={() => onTaskSelect(task)}
        >
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    onToggle(task.id)
                }}
                className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${task.completed
                    ? "bg-emerald-500 border-emerald-500"
                    : "border-amber-300 dark:border-gray-600 hover:border-orange-500 dark:hover:border-blue-400"
                    }`}
            >
                {task.completed && (
                    <svg className="w-2 h-2 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                )}
            </button>

            <div className="flex-1 min-w-0">
                <div
                    className={`text-sm sm:text-base break-words ${task.completed ? "line-through text-gray-500 dark:text-gray-400" : "text-gray-800 dark:text-gray-200"
                        }`}
                >
                    {task.text}
                </div>
                {task.dueDate && (
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                        <span className="hidden sm:inline">{t("tasks")}</span>
                        <div className="flex items-center gap-1">
                            <CalendarDays className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{t("due")} {task.dueDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{t("tomorrow")}</span>
                        </div>
                    </div>
                )}
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation()
                    onToggleImportant(task.id)
                }}
                className={`opacity-0 group-hover:opacity-100 sm:transition-opacity flex-shrink-0 ${task.isImportant
                    ? "text-orange-600 dark:text-blue-400 opacity-100"
                    : "text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-blue-400"
                    } sm:opacity-0 opacity-100`}
            >
                <Star className={`h-4 w-4 ${task.isImportant ? "fill-current" : ""}`} />
            </button>
        </div>
    )
}
