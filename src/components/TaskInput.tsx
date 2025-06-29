import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { TaskInputProps } from "@/types"
import { Plus } from "lucide-react"

export function TaskInput({ value, onChange, onAdd, onKeyPress }: TaskInputProps) {
    return (
        <div className="flex items-center gap-3 mb-4 sm:mb-6 p-3 rounded-lg hover:bg-amber-50 transition-colors bg-white border border-amber-300">
            <Plus className="w-4 h-4 text-orange-500 flex-shrink-0" />
            <Input
                type="text"
                placeholder="Add a task"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyPress={onKeyPress}
                className="border-0 shadow-none text-gray-800 placeholder:text-gray-500 focus-visible:ring-0 p-0 text-sm sm:text-base"
            />
            <Button
                onClick={onAdd}
                variant="ghost"
                size="sm"
                className="text-orange-500 hover:text-orange-600 hover:bg-orange-50 flex-shrink-0"
            >
                Add
            </Button>
        </div>
    )
}
