import type { MouseEvent } from "react";
import type { Task } from "@/types/domains/Task";

export interface TaskItemProps {
  task: Task;
  onToggle: (id: number, e?: MouseEvent<HTMLButtonElement>) => void;
  onToggleImportant: (id: number, e?: MouseEvent<HTMLButtonElement>) => void;
}

export interface TaskGridItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onToggleImportant: (id: number) => void;
}

export interface TaskListProps {
  tasks: Task[];
  viewMode: "grid" | "list";
  onToggle: (id: number) => void;
  onToggleImportant: (id: number) => void;
}
