export interface AccountMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onViewAccount: () => void;
  onSignOut: () => void;
  user: {
    name: string;
    email: string;
    avatar?: string;
  } | null;
}
