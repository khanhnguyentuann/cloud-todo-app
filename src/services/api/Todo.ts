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

export async function createTask(newTask: {
    text: string;
    completed?: boolean;
    dueDate?: string;
    reminder?: string;
    repeat?: string;
}) {
    console.log("🚀 Sending newTask to API:", newTask);
    const res = await fetch(`${BASE_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: newTask.text,
            completed: newTask.completed ?? false,
            dueDate: newTask.dueDate ?? "",
            reminder: newTask.reminder ?? "",
            repeat: newTask.repeat ?? "",
        }),
    });

    if (!res.ok) {
        throw new Error("Failed to create task");
    }

    return await res.json();
}
