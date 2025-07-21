import { createContext, useContext } from "react"
import type { UseTasksReturn } from "@/hooks/useTasks"
import type { UseUIStateReturn } from "@/hooks/useUIState"

export type TaskContextType = UseTasksReturn & UseUIStateReturn & {
    addTaskWithInput: () => Promise<void>
}

export const TaskContext = createContext<TaskContextType | null>(null)

export const useTaskContext = (): TaskContextType => {
    const ctx = useContext(TaskContext)
    if (!ctx) throw new Error("useTaskContext must be used within TaskProvider")
    return ctx
}
