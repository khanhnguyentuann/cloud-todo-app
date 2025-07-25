// src/lib/constants/buttonStyles.ts
export const BUTTON_STYLES = {
    primary: "text-theme-primary hover:bg-theme-primary/10",
    warning: "text-theme-warning hover:bg-theme-warning/10",
    error: "text-theme-error hover:bg-theme-error/10",
    success: "text-theme-success hover:bg-theme-success/10",
    ghost: "text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-surface-hover",
} as const

export const TASK_STYLES = {
    completed: "line-through text-theme-text-muted",
    active: "text-theme-text-primary",
    important: "text-theme-warning",
    checkbox: {
        completed: "bg-theme-success border-theme-success",
        uncompleted: "border-theme-border hover:border-theme-primary"
    }
} as const
