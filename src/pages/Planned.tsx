import { useTaskContext } from "@/context/TaskContext"
import { ContentHeader } from "@/components/features/ContentHeader"
import { TaskList } from "@/components/features/TaskList"
import { getCurrentDate } from "@/utils/getCurrentDate"
import { sortTasks } from "@/utils/sortTask"

export default function Planned() {
    const ctx = useTaskContext()

    return (
        <>
            <ContentHeader
                title="Planned"
                date={getCurrentDate()}
                viewMode={ctx.viewMode}
                onViewModeChange={ctx.setViewMode}
                sortBy={ctx.sortBy}
                onSortChange={ctx.setSortBy}
            />
            <div className="p-4">
                <TaskList
                    tasks={sortTasks(ctx.tasks.filter(task => task.dueDate !== ""), ctx.sortBy)}
                    viewMode={ctx.viewMode}
                    onToggle={ctx.toggleTask}
                    onToggleImportant={ctx.toggleImportant}
                    onTaskSelect={ctx.handleTaskSelect}
                />
            </div>
        </>
    )
}
