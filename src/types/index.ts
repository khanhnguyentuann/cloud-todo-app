import type {
    ReactNode,
    ComponentType,
    KeyboardEvent,
    MouseEvent,
    FC
} from "react";

// Core domain types
export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

export interface Task {
    id: number;
    text: string;
    completed: boolean;
    dueDate?: string;
    isImportant?: boolean;
}

// Database types
export interface DynamoDBTask {
    taskId: { S: string };
    title: { S: string };
    completed: { BOOL: boolean };
    dueDate: { S: string };
    isImportant: { BOOL: boolean };
}

// Common UI types
export type ViewMode = "grid" | "list";
export type MenuAlignment = "left" | "right";

export interface QuickOption {
    label: string;
    value?: string;
    day?: string;
    time?: string;
}

export interface SortOption {
    icon: FC<{ className?: string }>;
    label: string;
}

export interface SidebarItem {
    icon: ComponentType<{ className?: string }>;
    label: string;
    count: number;
    active?: boolean;
}

// Component Props Interfaces

// Header and Navigation
export interface HeaderProps {
    onMenuClick: () => void;
    onSettingsClick: () => void;
    onAccountClick: () => void;
    onHelpClick: () => void;
    onNotificationClick: () => void;
    unreadNotificationCount: number;
}

export interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    activeView: string;
    onViewChange: (view: string) => void;
    isMobile: boolean;
}

export interface ContentHeaderProps {
    title: string;
    date: string;
    viewMode: ViewMode;
    onViewModeChange: (mode: ViewMode) => void;
    sortBy: string;
    onSortChange: (sort: string) => void;
}

// Account and Settings
export interface AccountMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onViewAccount: () => void;
    onSignOut: () => void;
    user: User | null;
}

export interface AccountViewProps {
    isOpen: boolean;
    onClose: () => void;
    user: User | null;
}

export interface SettingsPanelProps {
    isOpen: boolean;
    onClose: () => void;
    isDarkMode: boolean;
    onToggleDarkMode: () => void;
}

// Task-related components
export interface TaskInputProps {
    value: string;
    onChange: (value: string) => void;
    onAdd: () => void;
    onKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
    placeholder?: string;
    selectedDueDate: string;
    setSelectedDueDate: (date: string) => void;
    selectedReminder: string;
    setSelectedReminder: (reminder: string) => void;
    selectedRepeat: string;
    setSelectedRepeat: (repeat: string) => void;
}

export interface TaskItemProps {
    task: Task;
    onToggle: (id: number, e?: MouseEvent<HTMLButtonElement>) => void;
    onToggleImportant: (id: number, e?: MouseEvent<HTMLButtonElement>) => void;
    onTaskSelect: (task: Task) => void;
}

export interface TaskGridItemProps {
    task: Task;
    onToggle: (id: number) => void;
    onToggleImportant: (id: number) => void;
    onTaskSelect: (task: Task) => void;
}

export interface TaskListProps {
    tasks: Task[];
    viewMode: ViewMode;
    onToggle: (id: number) => void;
    onToggleImportant: (id: number) => void;
    onTaskSelect: (task: Task) => void;
}

export interface TaskDetailSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    task: Task | null;
    isMobile: boolean;
}

// Menu components
export interface BaseMenuProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    trigger?: ReactNode;
}

export interface DueDateMenuProps extends BaseMenuProps {
    onDateSelect: (date: string) => void;
}

export interface ReminderMenuProps extends BaseMenuProps {
    onReminderSelect: (reminder: string) => void;
}

export interface RepeatMenuProps extends BaseMenuProps {
    onRepeatSelect: (repeat: string) => void;
}

export interface SortMenuProps extends BaseMenuProps {
    onSortChange: (sort: string) => void;
    currentSort: string;
}

// Generic UI components
export interface DropdownMenuProps {
    trigger: ReactNode;
    children: ReactNode;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    align?: MenuAlignment;
}

export interface TooltipProps {
    content: string;
    children: ReactNode;
    disabled?: boolean;
}

// Utility types for better type safety
export type TaskToggleHandler = (id: number, e?: MouseEvent<HTMLButtonElement>) => void;
export type TaskSelectHandler = (task: Task) => void;
export type ViewChangeHandler = (view: string) => void;
export type SortChangeHandler = (sort: string) => void;

// Event handler types
export interface TaskEventHandlers {
    onToggle: TaskToggleHandler;
    onToggleImportant: TaskToggleHandler;
    onTaskSelect: TaskSelectHandler;
}

// Form-related types
export interface TaskFormData {
    text: string;
    dueDate: string;
    reminder: string;
    repeat: string;
}

// API response types
export interface ApiResponse<T> {
    data: T;
    error?: string;
    success: boolean;
}

// Configuration types
export interface AppConfig {
    isDarkMode: boolean;
    viewMode: ViewMode;
    sortBy: string;
    activeView: string;
}