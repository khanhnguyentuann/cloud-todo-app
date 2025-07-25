import { useState } from "react";
import { useTaskContext } from "@/context/taskContext"
import { ContentHeader } from "@/components/features/ContentHeader"
import { TaskInput } from "@/components/features/TaskInput"
import { TaskList } from "@/components/features/TaskList"
import { getCurrentDate } from "@/utils/getCurrentDate"
import { sortTasks } from "@/utils/sortTask"
import { useTranslation } from "react-i18next"
import { ChevronDown } from "lucide-react";
import { useFilteredTasks } from "@/hooks/useFilteredTasks";

export default function Planned() {
    const ctx = useTaskContext()
    const { t } = useTranslation()
    const [visibleGroups, setVisibleGroups] = useState({
        earlier: true,
        today: true,
        later: true,
    });

    const plannedTasks = useFilteredTasks(ctx.tasks, 'planned');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const earlierTasks = plannedTasks.filter(task => new Date(task.dueDate!) < today);
    const todayTasks = plannedTasks.filter(task => new Date(task.dueDate!).getTime() === today.getTime());
    const laterTasks = plannedTasks.filter(task => new Date(task.dueDate!) > today);

    const toggleGroup = (group: keyof typeof visibleGroups) => {
        setVisibleGroups(prev => ({ ...prev, [group]: !prev[group] }));
    };

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
            <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
                <TaskInput placeholder={t("addPlannedTask")} />
                {earlierTasks.length > 0 && (
                    <div className="mt-4">
                        <button
                            className="flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400"
                            onClick={() => toggleGroup('earlier')}
                        >
                            <ChevronDown className={`w-4 h-4 transition-transform ${visibleGroups.earlier ? 'rotate-180' : ''}`} />
                            {t("earlier")} ({earlierTasks.length})
                        </button>
                        {visibleGroups.earlier && (
                            <div className="mt-2">
                                <TaskList tasks={sortTasks(earlierTasks, ctx.sortBy)} />
                            </div>
                        )}
                    </div>
                )}
                {todayTasks.length > 0 && (
                    <div className="mt-4">
                        <button
                            className="flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400"
                            onClick={() => toggleGroup('today')}
                        >
                            <ChevronDown className={`w-4 h-4 transition-transform ${visibleGroups.today ? 'rotate-180' : ''}`} />
                            {t("today")} ({todayTasks.length})
                        </button>
                        {visibleGroups.today && (
                            <div className="mt-2">
                                <TaskList tasks={sortTasks(todayTasks, ctx.sortBy)} />
                            </div>
                        )}
                    </div>
                )}
                {laterTasks.length > 0 && (
                    <div className="mt-4">
                        <button
                            className="flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400"
                            onClick={() => toggleGroup('later')}
                        >
                            <ChevronDown className={`w-4 h-4 transition-transform ${visibleGroups.later ? 'rotate-180' : ''}`} />
                            {t("later")} ({laterTasks.length})
                        </button>
                        {visibleGroups.later && (
                            <div className="mt-2">
                                <TaskList tasks={sortTasks(laterTasks, ctx.sortBy)} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}
