export interface Todo {
    id: string;
    title: string;
    completed: boolean;
    dueDate?: string | null;
    reminder?: string | null;
    repeat?: string | null;
    isImportant?: boolean;
}
