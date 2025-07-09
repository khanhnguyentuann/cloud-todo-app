import { TaskItem } from "@/components/features/TaskItem"
import { TaskGridItem } from "@/components/features/TaskGridItem"
import type { TaskListProps } from "@/types"
import { useTranslation } from "react-i18next"

export function TaskList({ tasks, viewMode, onToggle, onToggleImportant, onTaskSelect }: TaskListProps) {
    const { t } = useTranslation()

    if (tasks.length === 0) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-6">
                {t("noTasksFound") || "No tasks found"}
            </div>
        )
    }

    if (viewMode === "grid") {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {tasks.map((task) => (
                    <TaskGridItem
                        key={task.id}
                        task={task}
                        onToggle={onToggle}
                        onToggleImportant={onToggleImportant}
                        onTaskSelect={onTaskSelect}
                    />
                ))}
            </div>
        )
    }

    return (
        <div className="space-y-2">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onToggleImportant={onToggleImportant}
                    onTaskSelect={onTaskSelect}
                />
            ))}
        </div>
    )
}
