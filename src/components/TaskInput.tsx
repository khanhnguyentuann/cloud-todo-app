import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { TaskInputProps } from "@/types"
import { Plus } from "lucide-react"
import { useState } from "react"
import { DueDateMenu } from "@/components/DueDateMenu"
import { ReminderMenu } from "@/components/ReminderMenu"
import { RepeatMenu } from "@/components/RepeatMenu"

export function TaskInput({ value, onChange, onAdd, onKeyPress }: TaskInputProps) {
    const [dueDateMenuOpen, setDueDateMenuOpen] = useState(false)
    const [reminderMenuOpen, setReminderMenuOpen] = useState(false)
    const [repeatMenuOpen, setRepeatMenuOpen] = useState(false)
    const [selectedDueDate, setSelectedDueDate] = useState("")
    const [selectedReminder, setSelectedReminder] = useState("")
    const [selectedRepeat, setSelectedRepeat] = useState("")

    return (
        <div className="mb-4 sm:mb-6">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-700 transition-colors bg-white dark:bg-gray-700 border border-amber-300 dark:border-gray-600">
                <Plus className="w-4 h-4 text-orange-500 dark:text-blue-400 flex-shrink-0" />
                <Input
                    type="text"
                    placeholder="Add a task"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyPress={onKeyPress}
                    className="border-0 shadow-none text-gray-800 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:ring-0 p-0 text-sm sm:text-base bg-transparent"
                />
                <Button
                    onClick={onAdd}
                    variant="ghost"
                    size="sm"
                    className="text-orange-500 dark:text-blue-400 hover:text-orange-600 dark:hover:text-blue-300 hover:bg-orange-50 dark:hover:bg-gray-600 flex-shrink-0"
                >
                    Add
                </Button>
            </div>

            {/* Task options bar */}
            {(selectedDueDate || selectedReminder || selectedRepeat) && (
                <div className="flex items-center gap-2 mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    {selectedDueDate && (
                        <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                            {selectedDueDate}
                        </span>
                    )}
                    {selectedReminder && (
                        <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                            {selectedReminder}
                        </span>
                    )}
                    {selectedRepeat && (
                        <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                            {selectedRepeat}
                        </span>
                    )}
                </div>
            )}

            {/* Dropdown menus */}
            <div className="flex items-center gap-2 mt-2">
                <DueDateMenu isOpen={dueDateMenuOpen} onOpenChange={setDueDateMenuOpen} onDateSelect={setSelectedDueDate} />
                <ReminderMenu
                    isOpen={reminderMenuOpen}
                    onOpenChange={setReminderMenuOpen}
                    onReminderSelect={setSelectedReminder}
                />
                <RepeatMenu isOpen={repeatMenuOpen} onOpenChange={setRepeatMenuOpen} onRepeatSelect={setSelectedRepeat} />
            </div>
        </div>
    )
}
