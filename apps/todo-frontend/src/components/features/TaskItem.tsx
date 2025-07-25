import type { TaskItemProps } from "@/types"
import { Star, CalendarDays, Clock } from "lucide-react"
import { useTranslation } from "react-i18next"

export function TaskItem({ task, onToggle, onToggleImportant, onTaskSelect }: TaskItemProps) {
    const { t } = useTranslation()

    return (
        <div
            className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-theme-surface-hover dark:hover:bg-theme-surface-hover transition-all duration-200 group bg-theme-surface dark:bg-theme-surface border border-theme-border dark:border-theme-border hover:border-theme-border-hover dark:hover:border-theme-border-hover cursor-pointer shadow-sm hover:shadow-md"
            onClick={() => onTaskSelect(task)}
        >
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    onToggle(task.id)
                }}
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 ${task.completed
                    ? "bg-theme-success border-theme-success shadow-sm"
                    : "border-theme-border dark:border-theme-border hover:border-theme-primary dark:hover:border-theme-primary"
                    }`}
            >
                {task.completed && (
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-theme-success-foreground" fill="currentColor" viewBox="0 0 20 20">
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
                    className={`text-sm sm:text-base break-words font-medium leading-relaxed ${task.completed ? "line-through text-theme-text-muted" : "text-theme-text-primary"
                        }`}
                >
                    {task.title}
                </div>
                {task.dueDate && (
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 text-xs text-theme-text-secondary">
                        <span className="hidden sm:inline font-medium">{t("tasks")}</span>
                        <div className="flex items-center gap-1 bg-theme-surface-hover dark:bg-theme-surface-hover px-2 py-1 rounded-md">
                            <CalendarDays className="h-3 w-3 flex-shrink-0 text-theme-info" />
                            <span className="truncate font-medium">{t("due")} {task.dueDate}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-theme-surface-hover dark:bg-theme-surface-hover px-2 py-1 rounded-md">
                            <Clock className="h-3 w-3 flex-shrink-0 text-theme-warning" />
                            <span className="truncate font-medium">{t("tomorrow")}</span>
                        </div>
                    </div>
                )}
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation()
                    onToggleImportant(task.id)
                }}
                className={`opacity-0 group-hover:opacity-100 transition-all duration-200 flex-shrink-0 p-1.5 rounded-lg hover:bg-theme-surface-hover dark:hover:bg-theme-surface-hover ${task.isImportant
                    ? "text-theme-warning opacity-100"
                    : "text-theme-text-muted hover:text-theme-warning"
                    } sm:opacity-0 opacity-100`}
            >
                <Star className={`h-4 w-4 ${task.isImportant ? "fill-current" : ""}`} />
            </button>
        </div>
    )
}
