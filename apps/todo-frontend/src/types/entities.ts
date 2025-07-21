// =============================================================================
// CORE DOMAIN ENTITIES
// =============================================================================

// Domain Entities
export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    phone?: string;
    timezone?: string;
}

export interface Task {
    id: number;
    text: string;
    completed: boolean;
    dueDate?: string;
    isImportant?: boolean;
}

export interface Notification {
    id: number;
    type: "task" | "reminder" | "system";
    title: string;
    message: string;
    time: string;
    isRead: boolean;
    isImportant?: boolean;
}

// =============================================================================
// DATA LAYER TYPES
// =============================================================================

// Database DTOs
export interface DynamoDBTask {
    taskId: { S: string };
    title: { S: string };
    completed: { BOOL: boolean };
    dueDate: { S: string };
    isImportant: { BOOL: boolean };
}

// API Types
export interface ApiResponse<T> {
    data: T;
    error?: string;
    success: boolean;
}

// Generic API patterns
export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

// =============================================================================
// BUSINESS LOGIC TYPES
// =============================================================================

// Form Data
export interface TaskFormData {
    text: string;
    dueDate: string;
    reminder: string;
    repeat: string;
}

// Configuration
export interface AppConfig {
    isDarkMode: boolean;
    viewMode: ViewMode;
    sortBy: string;
    activeView: string;
}

// Common UI Enums & Unions
export type ViewMode = "grid" | "list";
export type MenuAlignment = "left" | "right";

// Filter value types
export type FilterValue = string | number | boolean | Date | string[] | number[];

export interface FilterOptions {
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    filters?: Record<string, FilterValue>;
}

// Generic base types for consistent interfaces
export interface BaseEntity {
    id: string | number;
    createdAt?: string;
    updatedAt?: string;
}
