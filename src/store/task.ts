import axios from "@/plugins/axios"
import { toast } from "sonner"
import { API_ENDPOINTS } from "@/store/common/endpoint"
import type { Task, DynamoDBTask } from "@/types"

export async function fetchTasks(): Promise<Task[]> {
    try {
        const response = await axios.get<DynamoDBTask[]>(API_ENDPOINTS.TASK.FETCH_TASKS)
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

        await axios.post<Task>(API_ENDPOINTS.TASK.CREATE_TASK, payload)
        toast.success("Created task successfully")
        return null
    } catch (error) {
        toast.error("Failed to create task")
        console.error("❌ Create task error:", error)
        return null
    }
}