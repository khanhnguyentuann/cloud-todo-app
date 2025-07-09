import type { TaskGridItemProps } from "@/types"
import { Star, CalendarDays, Clock } from "lucide-react"
import { useTranslation } from "react-i18next"

export function TaskGridItem({ task, onToggle, onToggleImportant, onTaskSelect }: TaskGridItemProps) {
    const { t } = useTranslation()

    return (
        <div
            className="p-4 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-600 transition-colors group bg-white dark:bg-gray-700 border border-amber-300 dark:border-gray-600 hover:border-amber-400 dark:hover:border-gray-500 min-h-[120px] flex flex-col cursor-pointer"
            onClick={() => onTaskSelect(task)}
        >
            <div className="flex items-start justify-between mb-3">
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onToggle(task.id)
                    }}
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

                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onToggleImportant(task.id)
                    }}
                    className={`opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ${task.isImportant
                            ? "text-orange-600 dark:text-blue-400 opacity-100"
                            : "text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-blue-400"
                        }`}
                >
                    <Star className={`h-4 w-4 ${task.isImportant ? "fill-current" : ""}`} />
                </button>
            </div>

            <div className="flex-1">
                <div
                    className={`text-sm mb-2 ${task.completed
                            ? "line-through text-gray-500 dark:text-gray-400"
                            : "text-gray-800 dark:text-gray-200"
                        }`}
                >
                    {task.text}
                </div>

                {task.dueDate && (
                    <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                            <CalendarDays className="h-3 w-3" />
                            <span>{t("due")} {task.dueDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{t("tomorrow")}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
