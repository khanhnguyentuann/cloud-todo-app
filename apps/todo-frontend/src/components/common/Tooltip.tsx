import type { TooltipProps } from "@/types"
import { useState } from "react"

export function Tooltip({ content, children, disabled = false }: TooltipProps) {
    const [isVisible, setIsVisible] = useState<boolean>(false)

    if (disabled) {
        return <>{children}</>
    }

    return (
        <div className="relative">
            <div
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                onClick={() => setIsVisible(false)}
            >
                {children}
            </div>

            {isVisible && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50">
                    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded shadow-lg border border-gray-200 dark:border-gray-600 whitespace-nowrap">
                        {content}
                    </div>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-white dark:border-b-gray-800"></div>
                </div>
            )}
        </div>
    )
}
