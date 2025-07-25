import { useMemo } from 'react';
import { Task } from '@/types';

type FilterType = 'myDay' | 'important' | 'planned' | 'all';

export const useFilteredTasks = (tasks: Task[], filter: FilterType) => {
    return useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        switch (filter) {
            case 'myDay':
                return tasks.filter(task => {
                    if (!task.createdAt) return false;
                    const createdAt = new Date(task.createdAt);
                    return createdAt.getDate() === today.getDate() &&
                        createdAt.getMonth() === today.getMonth() &&
                        createdAt.getFullYear() === today.getFullYear();
                });
            case 'important':
                return tasks.filter(task => task.isImportant);
            case 'planned':
                return tasks.filter(task => task.dueDate);
            case 'all':
            default:
                return tasks;
        }
    }, [tasks, filter]);
};
