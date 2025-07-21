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
  dueDate?: string;
  reminder?: string;
  repeat?: string;
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

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  timezone: string;
  avatar: string;
  preferences: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    weeklyDigest: boolean;
    taskReminders: boolean;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
