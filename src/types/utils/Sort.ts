import type { FC } from "react";

export interface SortMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSortChange: (sort: string) => void;
  currentSort: string;
}

export interface SortOption {
  icon: FC<{ className?: string }>;
  label: string;
}
