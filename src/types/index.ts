import type { FC, KeyboardEvent, ReactNode } from "react";
import type { MouseEvent } from "react";

export interface AccountMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ContentHeaderProps {
  title: string;
  date: string;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

export interface HeaderProps {
  onMenuClick: () => void;
  onSettingsClick: () => void;
  onAccountClick: () => void;
}

export interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: string;
  onViewChange: (view: string) => void;
  isMobile: boolean;
}

export interface SidebarItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  count: number;
  active?: boolean;
}

export interface TaskInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
  onKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export interface Task {
  id: number;
  text: string;
  completed: boolean;
  dueDate?: string;
  isImportant?: boolean;
}

export interface TaskItemProps {
  task: Task;
  onToggle: (id: number, e?: MouseEvent<HTMLButtonElement>) => void;
  onToggleImportant: (id: number, e?: MouseEvent<HTMLButtonElement>) => void;
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  align?: "left" | "right";
}

export interface DueDateMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDateSelect: (date: string) => void;
  trigger?: React.ReactNode;
}

export interface ReminderMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onReminderSelect: (reminder: string) => void;
  trigger?: React.ReactNode;
}

export interface RepeatMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onRepeatSelect: (repeat: string) => void;
  trigger?: React.ReactNode;
}

export interface QuickOption {
  label: string;
  value?: string;
  day?: string;
  time?: string;
}

export interface SortMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSortChange: (sort: string) => void;
}

export interface SortOption {
  icon: FC<{ className?: string }>;
  label: string;
}

export interface TooltipProps {
  content: string;
  children: ReactNode;
  disabled?: boolean;
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

export interface DynamoDBTask {
  taskId: { S: string };
  title: { S: string };
  completed: { BOOL: boolean };
  dueDate: { S: string };
  isImportant: { BOOL: boolean };
}
