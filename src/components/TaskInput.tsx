import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { TaskInputProps } from "@/types"
import { Bell, CalendarIcon, Plus, RotateCcw } from "lucide-react"
import { useState } from "react"
import { DueDateMenu } from "@/components/DueDateMenu"
import { ReminderMenu } from "@/components/ReminderMenu"
import { RepeatMenu } from "@/components/RepeatMenu"
import { Tooltip } from "@/components/Tooltip"

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

            {/* Action buttons with values */}
            <div className="flex items-center gap-2 mt-2">
                <Tooltip content="Add due date">
                    <DueDateMenu
                        isOpen={dueDateMenuOpen}
                        onOpenChange={setDueDateMenuOpen}
                        onDateSelect={setSelectedDueDate}
                        trigger={
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-600 flex items-center gap-1 transition-all ${selectedDueDate
                                        ? "border border-blue-300 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                        : "border border-transparent"
                                    }`}
                            >
                                <CalendarIcon className="h-4 w-4" />
                                {selectedDueDate && <span className="text-xs font-medium">{selectedDueDate}</span>}
                            </Button>
                        }
                    />
                </Tooltip>
                <Tooltip content="Add reminder">
                    <ReminderMenu
                        isOpen={reminderMenuOpen}
                        onOpenChange={setReminderMenuOpen}
                        onReminderSelect={setSelectedReminder}
                        trigger={
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-600 flex items-center gap-1 transition-all ${selectedReminder
                                        ? "border border-blue-300 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                        : "border border-transparent"
                                    }`}
                            >
                                <Bell className="h-4 w-4" />
                                {selectedReminder && <span className="text-xs font-medium">{selectedReminder}</span>}
                            </Button>
                        }
                    />
                </Tooltip>
                <Tooltip content="Set repeat options">
                    <RepeatMenu
                        isOpen={repeatMenuOpen}
                        onOpenChange={setRepeatMenuOpen}
                        onRepeatSelect={setSelectedRepeat}
                        trigger={
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-600 flex items-center gap-1 transition-all ${selectedRepeat
                                        ? "border border-blue-300 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                        : "border border-transparent"
                                    }`}
                            >
                                <RotateCcw className="h-4 w-4" />
                                {selectedRepeat && <span className="text-xs font-medium">{selectedRepeat}</span>}
                            </Button>
                        }
                    />
                </Tooltip>

            </div>
        </div>
    )
}
