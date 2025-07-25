import axios from "@/lib/axios"
import { toast } from "sonner"
import { API_ENDPOINTS } from "@/store/api/endpoints"
import type { Task } from "@/types"
import { getErrorMessage, getErrorSeverity, ApiError } from "@/lib/utils/errorHandler"

interface FetchTasksResponse {
    success: boolean;
    data: Task[];
    count: number;
}

export async function fetchTasks(): Promise<Task[]> {
    try {
        const response = await axios.get<FetchTasksResponse>(API_ENDPOINTS.TASK.FETCH_TASKS)
        const responseData = response.data

        // Handle backend response format: {success: true, data: Task[], count: number}
        const data = responseData.data || []

        if (!Array.isArray(data)) {
            throw new Error("Invalid data format")
        }

        return data
    } catch (error) {
        const apiError = error as ApiError;
        const errorMessage = getErrorMessage(apiError);
        const severity = getErrorSeverity(apiError);

        if (severity === 'error') {
            toast.error(errorMessage);
        } else {
            toast.warning(errorMessage);
        }

        console.error("❌ Fetch tasks error:", error);
        return [];
    }
}

interface CreateTaskResponse {
    success: boolean;
    data: Task;
}

export async function createTask(newTask: {
    text: string
    completed?: boolean
    dueDate?: string
    reminder?: string
    repeat?: string
    isImportant?: boolean
}): Promise<Task | null> {
    try {
        const payload = {
            title: newTask.text,
            completed: newTask.completed ?? false,
            dueDate: newTask.dueDate ?? null,
            reminder: newTask.reminder ?? null,
            repeat: newTask.repeat ?? null,
            isImportant: newTask.isImportant ?? false
        }

        const response = await axios.post<CreateTaskResponse>(API_ENDPOINTS.TASK.CREATE_TASK, payload)
        toast.success("Created task successfully")

        // Return the created task from response
        return response.data.data || null
    } catch (error) {
        const apiError = error as ApiError;
        const errorMessage = getErrorMessage(apiError);
        const severity = getErrorSeverity(apiError);

        if (severity === 'error') {
            toast.error(errorMessage);
        } else {
            toast.warning(errorMessage);
        }

        console.error("❌ Create task error:", error);
        return null;
    }
}

export async function updateTaskImportance(taskId: string, isImportant: boolean): Promise<Task | null> {
    try {
        const response = await axios.put<CreateTaskResponse>(API_ENDPOINTS.TASK.UPDATE_TASK(taskId), { isImportant });
        toast.success("Task updated successfully");
        return response.data.data || null;
    } catch (error) {
        const apiError = error as ApiError;
        const errorMessage = getErrorMessage(apiError);
        const severity = getErrorSeverity(apiError);

        if (severity === 'error') {
            toast.error(errorMessage);
        } else {
            toast.warning(errorMessage);
        }

        console.error("❌ Update task importance error:", error);
        return null;
    }
}

export async function updateTask(taskId: string, updates: Partial<Task>): Promise<Task | null> {
    try {
        const response = await axios.put<CreateTaskResponse>(API_ENDPOINTS.TASK.UPDATE_TASK(taskId), updates);
        toast.success("Task updated successfully");
        return response.data.data || null;
    } catch (error) {
        const apiError = error as ApiError;
        const errorMessage = getErrorMessage(apiError);
        const severity = getErrorSeverity(apiError);

        if (severity === 'error') {
            toast.error(errorMessage);
        } else {
            toast.warning(errorMessage);
        }

        console.error("❌ Update task error:", error);
        return null;
    }
}

export async function deleteTask(taskId: string): Promise<boolean> {
    try {
        await axios.delete(API_ENDPOINTS.TASK.DELETE_TASK(taskId));
        toast.success("Task deleted successfully");
        return true;
    } catch (error) {
        const apiError = error as ApiError;
        const errorMessage = getErrorMessage(apiError);
        const severity = getErrorSeverity(apiError);

        if (severity === 'error') {
            toast.error(errorMessage);
        } else {
            toast.warning(errorMessage);
        }

        console.error("❌ Delete task error:", error);
        return false;
    }
}
