import axios from "axios"
import { toast } from "sonner"
import type { Task, DynamoDBTask } from "@/types"

const BASE_URL = import.meta.env.VITE_API_URL

export async function fetchTasks(): Promise<Task[]> {
    try {
        const response = await axios.get<DynamoDBTask[]>(`${BASE_URL}/tasks`)
        const data = response.data

        if (!Array.isArray(data)) {
            throw new Error("Invalid data format")
        }

        const mapped = data.map((item) => ({
            id: parseInt(item.taskId.S),
            text: item.title.S,
            completed: item.completed.BOOL,
            dueDate: item.dueDate?.S,
            isImportant: item.isImportant?.BOOL,
        }))

        return mapped
    } catch (error) {
        toast.error("Failed to fetch tasks")
        console.error("❌ Fetch tasks error:", error)
        return []
    }
}

export async function createTask(newTask: {
    text: string
    completed?: boolean
    dueDate?: string
    reminder?: string
    repeat?: string
}): Promise<Task | null> {
    try {
        const payload = {
            title: newTask.text,
            completed: newTask.completed ?? false,
            dueDate: newTask.dueDate ?? "",
            reminder: newTask.reminder ?? "",
            repeat: newTask.repeat ?? "",
        }

        await axios.post<Task>(`${BASE_URL}/tasks`, payload)
        toast.success("Created task successfully")
        return null 
    } catch (error) {
        toast.error("Failed to create task")
        console.error("❌ Create task error:", error)
        return null
    }
}
