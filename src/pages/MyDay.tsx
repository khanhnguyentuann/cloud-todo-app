import { useTaskContext } from "@/context/TaskContext"
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
                <TaskInput
                    value={ctx.inputValue}
                    onChange={ctx.setInputValue}
                    onAdd={ctx.addTask}
                    onKeyPress={(e) => { if (e.key === "Enter") ctx.addTask() }}
                    selectedDueDate={ctx.dueDate}
                    setSelectedDueDate={ctx.setDueDate}
                    selectedReminder={ctx.reminder}
                    setSelectedReminder={ctx.setReminder}
                    selectedRepeat={ctx.repeat}
                    setSelectedRepeat={ctx.setRepeat}
                />
                <TaskList
                    tasks={sortTasks(ctx.tasks, ctx.sortBy)}
                    viewMode={ctx.viewMode}
                    onToggle={ctx.toggleTask}
                    onToggleImportant={ctx.toggleImportant}
                    onTaskSelect={ctx.handleTaskSelect}
                />
            </div>
        </>
    )
}
