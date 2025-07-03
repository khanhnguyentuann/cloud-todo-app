export interface DueDateMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDateSelect: (date: string) => void;
  trigger?: React.ReactNode;
}
