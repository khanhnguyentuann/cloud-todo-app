import type { Task, DynamoDBTask } from "@/types";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchTasks(): Promise<Task[]> {
    const res = await fetch(`${BASE_URL}/tasks`);
    if (!res.ok) {
        throw new Error("Failed to fetch tasks");
    }
    const data: DynamoDBTask[] = await res.json();
    if (!Array.isArray(data)) {
        throw new Error("Invalid data format");
    }

    return data.map((item) => ({
        id: parseInt(item.taskId.S),
        text: item.title.S,
        completed: item.completed.BOOL,
        dueDate: item.dueDate?.S,
        isImportant: item.isImportant?.BOOL,
    }));
}
