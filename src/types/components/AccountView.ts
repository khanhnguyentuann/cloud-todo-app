export interface AccountViewProps {
    isOpen: boolean;
    onClose: () => void;
    user: {
        id: string;
        name: string;
        email: string;
        avatar?: string;
    } | null;
}
