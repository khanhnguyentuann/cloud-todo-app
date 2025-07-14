import { useTaskContext } from "@/context/taskContext"
import { ContentHeader } from "@/components/features/ContentHeader"
import { TaskInput } from "@/components/features/TaskInput"
import { TaskList } from "@/components/features/TaskList"
import { getCurrentDate } from "@/utils/getCurrentDate"
import { sortTasks } from "@/utils/sortTask"

export default function MyDay() {
    const ctx = useTaskContext()

    return (
        <>
            <ContentHeader
                title="My Day"
                date={getCurrentDate()}
                viewMode={ctx.viewMode}
                onViewModeChange={ctx.setViewMode}
                sortBy={ctx.sortBy}
                onSortChange={ctx.setSortBy}
            />
            <div className="p-4">
                <TaskInput />
                <TaskList
                    tasks={sortTasks(ctx.tasks, ctx.sortBy)}
                />
            </div>
        </>
    )
}
