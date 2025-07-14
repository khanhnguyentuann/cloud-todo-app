import { ContentHeader } from "@/components/features/ContentHeader"
import { TaskInput } from "@/components/features/TaskInput"
import { TaskList } from "@/components/features/TaskList"
import { useTaskContext } from "@/context/taskContext"
import { getCurrentDate } from "@/utils/getCurrentDate"
import { useTranslation } from "react-i18next"

export default function Important() {
    const ctx = useTaskContext()
    const { t } = useTranslation()
    return (
        <>
            <ContentHeader
                title={t("important")}
                date={getCurrentDate()}
                viewMode={ctx.viewMode}
                onViewModeChange={ctx.setViewMode}
                sortBy={ctx.sortBy}
                onSortChange={ctx.setSortBy} />
            <div className="p-3 sm:p-4 lg:p-6">
                <TaskInput placeholder={t("addImportantTask")} />
                <TaskList
                    tasks={ctx.tasks.filter(task => task.isImportant)}
                />
            </div>
        </>
    )
}
