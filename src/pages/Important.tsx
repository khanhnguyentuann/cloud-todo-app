import { ContentHeader } from "@/components/features/ContentHeader"
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
            <div className="p-4">
                <TaskList
                    tasks={ctx.tasks.filter(task => task.isImportant)}
                />
            </div>
        </>
    )
}
