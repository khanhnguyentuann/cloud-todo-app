// src/hooks/useTaskActions.ts
import type { Task } from "@/types"

export const useTaskActions = (
    task: Task, 
    onToggle: (id: number) => void, 
    onToggleImportant: (id: number) => void
) => {
    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation()
        onToggle(task.id)
    }

    const handleToggleImportant = (e: React.MouseEvent) => {
        e.stopPropagation()
        onToggleImportant(task.id)
    }

    return { handleToggle, handleToggleImportant }
}
