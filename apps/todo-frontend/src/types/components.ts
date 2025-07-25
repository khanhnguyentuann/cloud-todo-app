// =============================================================================
// UI COMPONENT PROPS
// =============================================================================

import type {
    ReactNode,
    ComponentType,
    MouseEvent,
    FC
} from "react";

import type { Task, User, ViewMode, MenuAlignment } from "@/types/entities";

// =============================================================================
// UI DATA STRUCTURES
// =============================================================================

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

export interface Section {
    id: string;
    label: string;
    icon: React.ElementType;
}

// =============================================================================
// LAYOUT COMPONENT PROPS
// =============================================================================

// Main Layout
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

// =============================================================================
// FEATURE COMPONENT PROPS
// =============================================================================

// Task Management
export interface TaskItemProps {
    task: Task;
    onToggle: (id: string, e?: MouseEvent<HTMLButtonElement>) => void;
    onToggleImportant: (id: string, e?: MouseEvent<HTMLButtonElement>) => void;
    onTaskSelect: (task: Task) => void;
}

export interface TaskGridItemProps {
    task: Task;
    onToggle: (id: string) => void;
    onToggleImportant: (id: string) => void;
    onTaskSelect: (task: Task) => void;
}

export interface TaskDetailSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    task: Task | null;
    isMobile: boolean;
}

// User Management
export interface AccountMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onViewAccount: () => void;
    onSignOut: () => void;
    user: User | null;
}


// Settings
export interface SettingsPanelProps {
    isOpen: boolean;
    onClose: () => void;
    isDarkMode: boolean;
    onToggleDarkMode: () => void;
}

// Notifications
export interface NotificationPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

// Help System
export interface HelpPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

// =============================================================================
// MENU COMPONENT PROPS
// =============================================================================

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

// =============================================================================
// GENERIC UI COMPONENT PROPS
// =============================================================================

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

export interface PanelHeaderProps {
    title: string;
    onBack: () => void;
    onClose: () => void;
}

// =============================================================================
// MOBILE-SPECIFIC COMPONENT PROPS
// =============================================================================

export interface MobileSidebarProps {
    show: boolean;
    sections: Section[];
    activeSection: string;
    onSelect: (id: string) => void;
    onClose: () => void;
    t: (key: string) => string;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export interface SidebarHeaderProps {
    onClose: () => void;
    t: (key: string) => string;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export interface SidebarNavProps {
    sections: Section[];
    activeSection: string;
    onSelect: (id: string) => void;
}

// =============================================================================
// SPECIALIZED CONTENT COMPONENT PROPS
// =============================================================================

export interface FeatureCardProps {
    icon: React.ElementType;
    title: string;
    desc: string;
}

export interface ShortcutProps {
    keyCombo: string;
    desc: string;
}

export interface FAQProps {
    question: string;
    answer: string;
}

export interface ContactSupportProps {
    icon: React.ElementType;
    contact: string;
}

// =============================================================================
// EVENT HANDLER TYPES
// =============================================================================

export type TaskToggleHandler = (id: number, e?: MouseEvent<HTMLButtonElement>) => void;
export type TaskSelectHandler = (task: Task) => void;
export type ViewChangeHandler = (view: string) => void;
export type SortChangeHandler = (sort: string) => void;

// Grouped Event Handlers
export interface TaskEventHandlers {
    onToggle: TaskToggleHandler;
    onToggleImportant: TaskToggleHandler;
    onTaskSelect: TaskSelectHandler;
}

// =============================================================================
// BASE COMPONENT PROPS
// =============================================================================

export interface BasePanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface BaseMenuOptions {
    label: string;
    value: string;
    icon?: React.ElementType;
    disabled?: boolean;
}
