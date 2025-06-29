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
