import {
  Star,
  Calendar,
  UserCheck,
  CheckSquare,
} from "lucide-react";
import type { SidebarItem } from "@/types";

export const sidebarItems: SidebarItem[] = [
  { icon: CheckSquare, label: "Tasks", count: 1 },
  { icon: Star, label: "Important", count: 0 },
  { icon: Calendar, label: "Planned", count: 1 },
  { icon: UserCheck, label: "Assigned to me", count: 0 },
];
