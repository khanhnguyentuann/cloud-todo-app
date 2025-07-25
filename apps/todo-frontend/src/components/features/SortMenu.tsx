import { Button } from "@/components/common/Button";
import { Star, CalendarIcon, ArrowUpDown, Clock } from "lucide-react";
import { DropdownMenu } from "@/components/common/DropdownMenuBase";
import type { SortMenuProps } from "@/types";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

interface SortOption {
    icon: React.ElementType;
    key: string;
}

export function SortMenu({ isOpen, onOpenChange, onSortChange, currentSort }: SortMenuProps) {
    const timeoutRef = useRef<number | null>(null);
    const { t } = useTranslation();

    const sortOptions: SortOption[] = [
        { icon: Star, key: "important" },
        { icon: CalendarIcon, key: "dueDate" },
        { icon: ArrowUpDown, key: "alphabetical" },
        { icon: Clock, key: "creationDate" },
    ];

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        onOpenChange(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = window.setTimeout(() => {
            onOpenChange(false);
        }, 150);
    };

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <DropdownMenu
                align="right"
                trigger={
                    <Button
                        variant="ghost"
                        size="sm"
                        className={`text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${currentSort !== t("creationDate") ? "bg-amber-100 dark:bg-gray-700" : ""
                            }`}
                    >
                        <ArrowUpDown className="h-4 w-4" />
                        <span className="hidden lg:inline ml-1">{t("sort")}</span>
                    </Button>
                }
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <div className="p-2">
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2 px-2">
                        {t("sortBy")}
                    </div>
                    {sortOptions.map((option) => {
                        const label = t(option.key);
                        return (
                            <button
                                key={option.key}
                                onClick={() => {
                                    onSortChange(label);
                                    onOpenChange(false);
                                }}
                                className={`w-full flex items-center gap-3 px-2 py-2 text-sm rounded transition-colors ${currentSort === label
                                    ? "bg-amber-200 dark:bg-blue-600 text-orange-600 dark:text-white font-medium"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                                    }`}
                            >
                                <option.icon className="h-4 w-4" />
                                {label}
                                {currentSort === label && (
                                    <div className="ml-auto w-2 h-2 bg-orange-500 dark:bg-blue-400 rounded-full"></div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </DropdownMenu>
        </div>
    );
}
