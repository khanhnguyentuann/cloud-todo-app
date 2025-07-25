import { createContext, useContext } from "react"
import type { UseTasksReturn } from "@/hooks/useTasks"
import type { UseUIStateReturn } from "@/hooks/useUIState"
import type { useNotifications } from "@/hooks/useNotifications"

export type TaskContextType = UseTasksReturn & UseUIStateReturn & ReturnType<typeof useNotifications> & {
    addTaskWithInput: (isImportant?: boolean) => Promise<void>
}

export const TaskContext = createContext<TaskContextType | null>(null)

export const useTaskContext = (): TaskContextType => {
    const ctx = useContext(TaskContext)
    if (!ctx) throw new Error("useTaskContext must be used within TaskProvider")
    return ctx
}
