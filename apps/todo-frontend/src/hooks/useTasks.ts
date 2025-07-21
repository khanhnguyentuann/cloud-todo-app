import { useState, useEffect, useCallback } from 'react'
import { createTask, fetchTasks } from '@/store/task'
import type { Task } from '@/types'

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
    }) => Promise<void>
    toggleTask: (id: number) => void
    toggleImportant: (id: number) => void
    refreshTasks: () => Promise<void>
}

export function useTasks(): UseTasksReturn {
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
        refreshTasks()
    }, [refreshTasks])

    const addTask = useCallback(async (taskData: {
        text: string
        completed?: boolean
        dueDate?: string
        reminder?: string
        repeat?: string
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

    const toggleTask = useCallback((id: number) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        )
    }, [])

    const toggleImportant = useCallback((id: number) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, isImportant: !task.isImportant } : task
            )
        )
    }, [])

    return {
        tasks,
        isLoading,
        error,
        addTask,
        toggleTask,
        toggleImportant,
        refreshTasks
    }
}
