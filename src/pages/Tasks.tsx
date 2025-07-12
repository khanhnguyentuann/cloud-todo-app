import { ContentHeader } from "@/components/features/ContentHeader"
import { TaskList } from "@/components/features/TaskList"
import { useTaskContext } from "@/context/TaskContext"
import { getCurrentDate } from "@/utils/getCurrentDate"

export default function Tasks() {
    const ctx = useTaskContext()
    return (
        <>
            <ContentHeader
                title="All Tasks"
                date={getCurrentDate()}
                viewMode={ctx.viewMode}
                onViewModeChange={ctx.setViewMode}
                sortBy={ctx.sortBy}
                onSortChange={ctx.setSortBy} />
            <div className="p-4">
                <TaskList
                    tasks={ctx.tasks}
                    viewMode={ctx.viewMode}
                    onToggle={ctx.toggleTask}
                    onToggleImportant={ctx.toggleImportant}
                    onTaskSelect={ctx.handleTaskSelect}
                />
            </div>
        </>
    )
}
