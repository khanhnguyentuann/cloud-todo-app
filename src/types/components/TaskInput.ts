import type { KeyboardEvent } from "react";

export interface TaskInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
  onKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  selectedDueDate: string;
  setSelectedDueDate: (date: string) => void;
  selectedReminder: string;
  setSelectedReminder: (reminder: string) => void;
  selectedRepeat: string;
  setSelectedRepeat: (repeat: string) => void;
}
