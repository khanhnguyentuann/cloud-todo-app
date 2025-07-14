import { useTaskContext } from "@/context/taskContext"
import { ContentHeader } from "@/components/features/ContentHeader"
import { TaskInput } from "@/components/features/TaskInput"
import { TaskList } from "@/components/features/TaskList"
import { getCurrentDate } from "@/utils/getCurrentDate"
import { sortTasks } from "@/utils/sortTask"
import { useTranslation } from "react-i18next"

export default function Planned() {
    const ctx = useTaskContext()
    const { t } = useTranslation()

    return (
        <>
            <ContentHeader
                title={t("planned")}
                date={getCurrentDate()}
                viewMode={ctx.viewMode}
                onViewModeChange={ctx.setViewMode}
                sortBy={ctx.sortBy}
                onSortChange={ctx.setSortBy}
            />
            <div className="p-3 sm:p-4 lg:p-6">
                <TaskInput placeholder={t("addPlannedTask")} />
                <TaskList
                    tasks={sortTasks(ctx.tasks.filter(task => task.dueDate !== ""), ctx.sortBy)}
                />
            </div>
        </>
    )
}
