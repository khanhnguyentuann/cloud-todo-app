import { TaskItem } from "@/components/features/TaskItem"
import { TaskGridItem } from "@/components/features/TaskGridItem"
import type { TaskListProps } from "@/types"

export function TaskList({ tasks, viewMode, onToggle, onToggleImportant, onTaskSelect }: TaskListProps) {
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
