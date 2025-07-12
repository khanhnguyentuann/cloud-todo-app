import { createContext, useContext } from "react"
import type { Task } from "@/types"

type TaskContextType = {
    tasks: Task[]
    setTasks: (tasks: Task[]) => void
    inputValue: string
    setInputValue: (val: string) => void
    dueDate: string
    setDueDate: (val: string) => void
    reminder: string
    setReminder: (val: string) => void
    repeat: string
    setRepeat: (val: string) => void
    addTask: () => void
    toggleTask: (id: number) => void
    toggleImportant: (id: number) => void
    sortBy: string
    setSortBy: (val: string) => void
    viewMode: "grid" | "list"
    setViewMode: (val: "grid" | "list") => void
    handleTaskSelect: (task: Task) => void
}

export const TaskContext = createContext<TaskContextType | null>(null)

export const useTaskContext = () => {
    const ctx = useContext(TaskContext)
    if (!ctx) throw new Error("useTaskContext must be used within TaskContext.Provider")
    return ctx
}
