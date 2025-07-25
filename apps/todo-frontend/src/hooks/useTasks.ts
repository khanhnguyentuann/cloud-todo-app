import { useState, useEffect, useCallback } from 'react'
import { createTask, deleteTask, fetchTasks, updateTask, updateTaskImportance } from '@/store/task'
import type { Task } from '@/types'

export interface UseTasksProps {
    fetchNotifications: () => void;
}

export interface UseTasksReturn {
    tasks: Task[]
    isLoading: boolean
    error: string | null
    addTask: (taskData: {
        text: string
        completed?: boolean
        dueDate?: string
        reminder?: string
        repeat?: string
        isImportant?: boolean
    }) => Promise<void>
    toggleTask: (id: string) => void
    toggleImportant: (id: string) => void
    updateTask: (id: string, updates: Partial<Task>) => Promise<void>
    deleteTask: (id: string) => Promise<void>
    refreshTasks: () => Promise<void>
    token: string | null
    setToken: (token: string | null) => void
}

export function useTasks({ fetchNotifications }: UseTasksProps): UseTasksReturn {
    const [token, setToken] = useState<string | null>(null)
    const [tasks, setTasks] = useState<Task[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const refreshTasks = useCallback(async () => {
        try {
            setIsLoading(true)
            setError(null)
            const fetchedTasks = await fetchTasks()
            setTasks(fetchedTasks)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load tasks')
            console.error('Failed to load tasks:', err)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        if (token) {
            refreshTasks()
        }
    }, [refreshTasks, token])

    const addTask = useCallback(async (taskData: {
        text: string
        completed?: boolean
        dueDate?: string
        reminder?: string
        repeat?: string
        isImportant?: boolean
    }) => {
        if (taskData.text.trim() === '') return

        try {
            await createTask(taskData)
            await refreshTasks()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create task')
            console.error('Failed to create task:', err)
        }
    }, [refreshTasks])

    const toggleTask = useCallback(async (id: string) => {
        const task = tasks.find(t => t.id === id);
        if (!task) return;

        const newCompleted = !task.completed;

        setTasks(prevTasks =>
            prevTasks.map(t =>
                t.id === id ? { ...t, completed: newCompleted } : t
            )
        );

        try {
            await updateTask(id, { completed: newCompleted });
            if (newCompleted) {
                fetchNotifications();
            }
        } catch (err) {
            // Revert the change in case of an error
            setTasks(prevTasks =>
                prevTasks.map(t =>
                    t.id === id ? { ...t, completed: task.completed } : t
                )
            );
            setError(err instanceof Error ? err.message : 'Failed to update task completion');
            console.error('Failed to update task completion:', err);
        }
    }, [tasks, fetchNotifications]);

    const toggleImportant = useCallback(async (id: string) => {
        const task = tasks.find(t => t.id === id);
        if (!task) return;

        const newIsImportant = !task.isImportant;

        setTasks(prevTasks =>
            prevTasks.map(t =>
                t.id === id ? { ...t, isImportant: newIsImportant } : t
            )
        );

        try {
            await updateTaskImportance(id, newIsImportant);
        } catch (err) {
            // Revert the change in case of an error
            setTasks(prevTasks =>
                prevTasks.map(t =>
                    t.id === id ? { ...t, isImportant: task.isImportant } : t
                )
            );
            setError(err instanceof Error ? err.message : 'Failed to update task importance');
            console.error('Failed to update task importance:', err);
        }
    }, [tasks]);

    const updateTaskHandler = useCallback(async (id: string, updates: Partial<Task>) => {
        const originalTasks = [...tasks];
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, ...updates } : task
        );
        setTasks(updatedTasks);

        try {
            await updateTask(id, updates);
            await refreshTasks();
        } catch (err) {
            setTasks(originalTasks);
            setError(err instanceof Error ? err.message : 'Failed to update task');
            console.error('Failed to update task:', err);
        }
    }, [tasks, refreshTasks]);

    const deleteTaskHandler = useCallback(async (id: string) => {
        const originalTasks = [...tasks];
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);

        try {
            await deleteTask(id);
        } catch (err) {
            setTasks(originalTasks);
            setError(err instanceof Error ? err.message : 'Failed to delete task');
            console.error('Failed to delete task:', err);
        }
    }, [tasks]);

    return {
        tasks,
        isLoading,
        error,
        addTask,
        toggleTask,
        toggleImportant,
        updateTask: updateTaskHandler,
        deleteTask: deleteTaskHandler,
        refreshTasks,
        token,
        setToken
    }
}
