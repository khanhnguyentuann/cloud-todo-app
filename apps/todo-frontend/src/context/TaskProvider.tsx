import { ReactNode, useEffect } from "react"
import { useTasks } from "@/hooks/useTasks"
import { useUIState } from "@/hooks/useUIState"
import { TaskContext, type TaskContextType } from "@/context/taskContext"

interface TaskProviderProps { children: ReactNode }

export function TaskProvider({ children }: TaskProviderProps) {
    const taskState = useTasks()
    const uiState = useUIState()

    useEffect(() => {
        const savedToken = localStorage.getItem("token")
        if (savedToken && !taskState.token) {
            taskState.setToken(savedToken)
        }

        const handleStorageChange = () => {
            const updatedToken = localStorage.getItem("token")
            if (updatedToken !== taskState.token) {
                taskState.setToken(updatedToken)
            }
        }

        window.addEventListener("storage", handleStorageChange)

        return () => {
            window.removeEventListener("storage", handleStorageChange)
        }
    }, [taskState])

    useEffect(() => {
        if (taskState.token) {
            localStorage.setItem("token", taskState.token)
        }
    }, [taskState.token])

    const addTaskWithInput = async (isImportant = false) => {
        await taskState.addTask({
            text: uiState.inputValue,
            completed: false,
            dueDate: uiState.dueDate,
            reminder: uiState.reminder,
            repeat: uiState.repeat,
            isImportant
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
