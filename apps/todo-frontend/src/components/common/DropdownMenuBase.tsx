import type { DropdownMenuProps } from "@/types"
import { type FC } from "react"

export const DropdownMenu: FC<DropdownMenuProps> = ({
    trigger,
    children,
    isOpen,
    onOpenChange,
    align = "left",
}) => {
    return (
        <div className="relative">
            <div onClick={() => onOpenChange(!isOpen)}>{trigger}</div>
            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => onOpenChange(false)} />
                    <div
                        className={`absolute top-full mt-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-20 min-w-48 ${align === "right" ? "right-0" : "left-0"
                            }`}
                    >
                        {children}
                    </div>
                </>
            )}
        </div>
    )
}
