import type { Task } from "@/types"

export function sortTasks(tasks: Task[], sortType: string): Task[] {
    const tasksCopy = [...tasks]
    switch (sortType) {
        case "Important":
            return tasksCopy.sort((a, b) => (a.isImportant === b.isImportant ? 0 : a.isImportant ? -1 : 1))
        case "Due date":
            return tasksCopy.sort((a, b) => {
                if (!a.dueDate && !b.dueDate) return 0
                if (!a.dueDate) return 1
                if (!b.dueDate) return -1
                return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
            })
        case "Alphabetical":
            return tasksCopy.sort((a, b) => a.text.localeCompare(b.text))
        default:
            return tasksCopy.sort((a, b) => a.id - b.id)
    }
}
