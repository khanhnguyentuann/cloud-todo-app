import { useTaskContext } from "@/context/taskContext"
import { ContentHeader } from "@/components/features/ContentHeader"
import { TaskInput } from "@/components/features/TaskInput"
import { TaskList } from "@/components/features/TaskList"
import { getCurrentDate } from "@/utils/getCurrentDate"
import { sortTasks } from "@/utils/sortTask"
import { useTranslation } from "react-i18next"

export default function MyDay() {
    const ctx = useTaskContext()
    const { t } = useTranslation()

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
                    tasks={sortTasks(ctx.tasks.filter(task => {
                        if (!task.createdAt) return false;
                        const createdAt = new Date(task.createdAt);
                        const today = new Date();
                        return createdAt.getDate() === today.getDate() &&
                               createdAt.getMonth() === today.getMonth() &&
                               createdAt.getFullYear() === today.getFullYear();
                    }), ctx.sortBy)}
                />
            </div>
        </>
    )
}
