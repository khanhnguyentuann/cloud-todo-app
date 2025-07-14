import { ContentHeader } from "@/components/features/ContentHeader"
import { TaskList } from "@/components/features/TaskList"
import { TaskInput } from "@/components/features/TaskInput"
import { useTaskContext } from "@/context/taskContext"
import { getCurrentDate } from "@/utils/getCurrentDate"
import { useTranslation } from "react-i18next"

export default function Tasks() {
    const ctx = useTaskContext()
    const { t } = useTranslation()
    return (
        <>
            <ContentHeader
                title={t("allTasks")}
                date={getCurrentDate()}
                viewMode={ctx.viewMode}
                onViewModeChange={ctx.setViewMode}
                sortBy={ctx.sortBy}
                onSortChange={ctx.setSortBy} />
            <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
                <TaskInput placeholder={t("addTask")} />
                <TaskList
                    tasks={ctx.tasks}
                />
            </div>
        </>
    )
}
