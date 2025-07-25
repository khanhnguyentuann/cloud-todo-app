import { useTaskContext } from "@/context/taskContext"
import { ContentHeader } from "@/components/features/ContentHeader"
import { TaskInput } from "@/components/features/TaskInput"
import { TaskList } from "@/components/features/TaskList"
import { getCurrentDate } from "@/utils/getCurrentDate"
import { sortTasks } from "@/utils/sortTask"
import { useTranslation } from "react-i18next"
import { useFilteredTasks } from "@/hooks/useFilteredTasks"

export default function MyDay() {
    const ctx = useTaskContext()
    const { t } = useTranslation()
    const filteredTasks = useFilteredTasks(ctx.tasks, 'myDay');

    return (
        <>
            <ContentHeader
                title={t("myDay")}
                date={getCurrentDate()}
                viewMode={ctx.viewMode}
                onViewModeChange={ctx.setViewMode}
                sortBy={ctx.sortBy}
                onSortChange={ctx.setSortBy}
            />
            <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
                <TaskInput />
                <TaskList
                    tasks={sortTasks(filteredTasks, ctx.sortBy)}
                />
            </div>
        </>
    )
}
