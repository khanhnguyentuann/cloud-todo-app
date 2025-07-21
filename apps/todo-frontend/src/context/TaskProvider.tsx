import type { ReactNode } from "react"
import { useTasks } from "@/hooks/useTasks"
import { useUIState } from "@/hooks/useUIState"
import { TaskContext, type TaskContextType } from "@/context/taskContext"

interface TaskProviderProps { children: ReactNode }

export function TaskProvider({ children }: TaskProviderProps) {
    const taskState = useTasks()
    const uiState = useUIState()

    const addTaskWithInput = async () => {
        await taskState.addTask({
            text: uiState.inputValue,
            completed: false,
            dueDate: uiState.dueDate,
            reminder: uiState.reminder,
            repeat: uiState.repeat
        })
        uiState.clearTaskInput()
    }

    const contextValue: TaskContextType = {
        ...taskState,
        ...uiState,
        addTaskWithInput
    }

    return (
        <TaskContext.Provider value={contextValue}>
            {children}
        </TaskContext.Provider>
    )
}
