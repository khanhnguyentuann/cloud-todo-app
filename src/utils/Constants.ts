import {
  Sun,
  Star,
  Calendar,
  UserCheck,
  Flag,
  CheckSquare,
} from "lucide-react";
import type { SidebarItem } from "@/types";

export const sidebarItems: SidebarItem[] = [
  { icon: Sun, label: "My Day", count: 1 },
  { icon: Star, label: "Important", count: 0 },
  { icon: Calendar, label: "Planned", count: 1 },
  { icon: UserCheck, label: "Assigned to me", count: 0 },
  { icon: Flag, label: "Flagged email", count: 0 },
  { icon: CheckSquare, label: "Tasks", count: 1 },
];
