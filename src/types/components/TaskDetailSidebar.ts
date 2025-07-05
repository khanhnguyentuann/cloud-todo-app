import type { Task } from "@/types/domains/Task";

export interface TaskDetailSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    task: Task | null;
    isMobile: boolean;
}
