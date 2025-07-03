export interface RepeatMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onRepeatSelect: (repeat: string) => void;
  trigger?: React.ReactNode;
}
