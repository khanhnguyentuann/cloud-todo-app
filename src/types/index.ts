import type { KeyboardEvent } from "react";
import type { MouseEvent } from "react";

export interface AccountMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ContentHeaderProps {
  title: string;
  date: string;
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
}

export interface ReminderMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onReminderSelect: (reminder: string) => void;
}

export interface RepeatMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onRepeatSelect: (repeat: string) => void;
}

export interface QuickOption {
  label: string;
  value?: string;
  day?: string;
  time?: string;
}
