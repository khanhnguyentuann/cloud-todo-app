import { TaskItem } from "@/components/features/TaskItem"
import { TaskGridItem } from "@/components/features/TaskGridItem"
import { useTranslation } from "react-i18next"
import { useTaskContext } from "@/context/taskContext"
import type { Task } from "@/types"

interface TaskListProps {
    tasks: Task[]
}

export function TaskList({ tasks }: TaskListProps) {
    const { t } = useTranslation()
    const { viewMode, toggleTask, toggleImportant, handleTaskSelect } = useTaskContext()

    if (tasks.length === 0) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-6">
                {t("noTasksFound") || "No tasks found"}
            </div>
        )
    }

    if (viewMode === "grid") {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4">
                {tasks.map((task) => (
                    <TaskGridItem
                        key={task.id}
                        task={task}
                        onToggle={toggleTask}
                        onToggleImportant={toggleImportant}
                        onTaskSelect={handleTaskSelect}
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
                    onToggle={toggleTask}
                    onToggleImportant={toggleImportant}
                    onTaskSelect={handleTaskSelect}
                />
            ))}
        </div>
    )
}
