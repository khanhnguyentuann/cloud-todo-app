"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import type { DueDateMenuProps } from "@/types"
import { DropdownMenu } from "@/components/DropdownMenuBase"
import { dueDateQuickOptions } from "@/utils/Constants"

export function DueDateMenu({ isOpen, onOpenChange, onDateSelect }: DueDateMenuProps) {
    const [showCalendar, setShowCalendar] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date>()

    if (showCalendar) {
        return (
            <DropdownMenu
                trigger={
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-600"
                    >
                        <CalendarIcon className="h-4 w-4" />
                    </Button>
                }
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <div className="p-1 w-70 flex items-center justify-between flex-col">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border-0"
                    />
                    <Button
                        className="w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white"
                        onClick={() => {
                            if (selectedDate) {
                                onDateSelect(selectedDate.toDateString())
                                onOpenChange(false)
                                setShowCalendar(false)
                            }
                        }}
                    >
                        Save
                    </Button>
                </div>
            </DropdownMenu>
        )
    }

    return (
        <DropdownMenu
            trigger={
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-600"
                >
                    <CalendarIcon className="h-4 w-4" />
                </Button>
            }
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <div className="p-2">
                <div className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2 px-2">Due</div>
                {dueDateQuickOptions.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => {
                            onDateSelect(option.value ?? "")
                            onOpenChange(false)
                        }}
                        className="w-full flex items-center justify-between px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                    >
                        <div className="flex items-center gap-3">
                            <CalendarIcon className="h-4 w-4" />
                            {option.label}
                        </div>
                        <span className="text-gray-500 dark:text-gray-400">{option.day}</span>
                    </button>
                ))}
                <button
                    onClick={() => setShowCalendar(true)}
                    className="w-full flex items-center gap-3 px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                >
                    <CalendarIcon className="h-4 w-4" />
                    Pick a date
                </button>
            </div>
        </DropdownMenu>
    )
}
