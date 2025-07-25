import { useState } from "react";
import { ContentHeader } from "@/components/features/ContentHeader"
import { TaskList } from "@/components/features/TaskList"
import { TaskInput } from "@/components/features/TaskInput"
import { useTaskContext } from "@/context/taskContext"
import { getCurrentDate } from "@/utils/getCurrentDate"
import { useTranslation } from "react-i18next"
import { ChevronDown } from "lucide-react";

export default function Tasks() {
    const ctx = useTaskContext()
    const { t } = useTranslation()
    const [uncompletedTasksVisible, setUncompletedTasksVisible] = useState(true);
    const [completedTasksVisible, setCompletedTasksVisible] = useState(true);

    const uncompletedTasks = ctx.tasks.filter(task => !task.completed);
    const completedTasks = ctx.tasks.filter(task => task.completed);
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
                {uncompletedTasks.length > 0 && (
                    <div className="mt-4">
                        <button
                            className="flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400"
                            onClick={() => setUncompletedTasksVisible(!uncompletedTasksVisible)}
                        >
                            <ChevronDown className={`w-4 h-4 transition-transform ${uncompletedTasksVisible ? 'rotate-180' : ''}`} />
                            {t("uncompleted")} ({uncompletedTasks.length})
                        </button>
                        {uncompletedTasksVisible && (
                            <div className="mt-2">
                                <TaskList
                                    tasks={uncompletedTasks}
                                />
                            </div>
                        )}
                    </div>
                )}
                {completedTasks.length > 0 && (
                    <div className="mt-4">
                        <button
                            className="flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400"
                            onClick={() => setCompletedTasksVisible(!completedTasksVisible)}
                        >
                            <ChevronDown className={`w-4 h-4 transition-transform ${completedTasksVisible ? 'rotate-180' : ''}`} />
                            {t("completed")} ({completedTasks.length})
                        </button>
                        {completedTasksVisible && (
                            <div className="mt-2">
                                <TaskList
                                    tasks={completedTasks}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}
