export interface Todo {
    id: string;
    title: string;
    completed: boolean;
    dueDate?: string | null;
    reminder?: string | null;
    repeat?: string | null;
    isImportant?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateTodoRequest {
    title: string;
    dueDate?: string | null;
    reminder?: string | null;
    repeat?: string | null;
    isImportant?: boolean;
}

export interface UpdateTodoRequest {
    title?: string;
    completed?: boolean;
    dueDate?: string | null;
    reminder?: string | null;
    repeat?: string | null;
    isImportant?: boolean;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}
