// src/components/features/shared/TaskItemBase.tsx
import type { Task } from "@/types"
import { Star } from "lucide-react"

export interface TaskItemBaseProps {
    task: Task;
    onToggle: (id: number) => void;
    onToggleImportant: (id: number) => void;
    onTaskSelect: (task: Task) => void;
    variant?: 'list' | 'grid';
}

// Shared components
export const TaskCheckbox = ({ completed, onClick }: { 
    completed: boolean; 
    onClick: (e: React.MouseEvent) => void 
}) => (
    <button
        onClick={onClick}
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
            completed
                ? "bg-theme-success border-theme-success"
                : "border-theme-border hover:border-theme-primary"
        }`}
    >
        {completed && (
            <CheckIcon className="w-3 h-3 text-theme-success-foreground" />
        )}
    </button>
)

const CheckIcon = ({ className }: { className: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
        />
    </svg>
)

export const TaskImportantButton = ({ isImportant, onClick }: { 
    isImportant: boolean; 
    onClick: (e: React.MouseEvent) => void 
}) => (
    <button
        onClick={onClick}
        className={`opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ${
            isImportant
                ? "text-theme-warning opacity-100"
                : "text-theme-text-muted hover:text-theme-warning"
        }`}
    >
        <Star className={`h-4 w-4 ${isImportant ? "fill-current" : ""}`} />
    </button>
)
