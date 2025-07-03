export interface ReminderMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onReminderSelect: (reminder: string) => void;
  trigger?: React.ReactNode;
}
