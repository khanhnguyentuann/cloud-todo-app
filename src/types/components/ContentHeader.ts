export interface ContentHeaderProps {
  title: string;
  date: string;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}
