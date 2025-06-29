import { useState } from "react"
import type { KeyboardEvent } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

interface Task {
    id: number
    text: string
    completed: boolean
}

function TodoApp() {
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: 1,
            text: "Learn React and Tailwind CSS",
            completed: true,
        },
        {
            id: 2,
            text: "Build an awesome to-do app",
            completed: false,
        },
    ])
    const [inputValue, setInputValue] = useState("")

    const addTask = () => {
        if (inputValue.trim() !== "") {
            const newTask: Task = {
                id: Date.now(),
                text: inputValue.trim(),
                completed: false,
            }
            setTasks([...tasks, newTask])
            setInputValue("")
        }
    }

    const toggleTask = (id: number) => {
        setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
    }

    const deleteTask = (id: number) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }

    const completedCount = tasks.filter((task) => task.completed).length
    const totalCount = tasks.length

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-md mx-auto bg-white rounded shadow p-6">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">To-Do App</h1>

                {/* Input + Add button */}
                <div className="flex gap-2 mb-4">
                    <Input
                        placeholder="Enter a new task..."
                        value={inputValue}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="flex-1"
                    />
                    <Button onClick={addTask}>
                        Add
                    </Button>
                </div>

                {/* Task Counter */}
                {totalCount > 0 && (
                    <p className="text-sm text-gray-600 text-center mb-2">
                        {completedCount} of {totalCount} tasks completed
                    </p>
                )}

                {/* Task List */}
                <ul className="space-y-2">
                    {tasks.length === 0 ? (
                        <li className="text-center text-gray-400">No tasks yet. Add one above!</li>
                    ) : (
                        tasks.map((task) => (
                            <li
                                key={task.id}
                                className={`flex items-center justify-between p-2 border rounded ${task.completed ? "bg-green-50" : ""
                                    }`}
                            >
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <Checkbox
                                        checked={task.completed}
                                        onCheckedChange={() => toggleTask(task.id)}
                                    />
                                    <span className={task.completed ? "line-through text-gray-500" : ""}>
                                        {task.text}
                                    </span>
                                </label>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => deleteTask(task.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    🗑️
                                </Button>
                            </li>
                        ))
                    )}
                </ul>

                {/* Clear Completed */}
                {completedCount > 0 && (
                    <div className="text-center mt-4">
                        <Button
                            variant="link"
                            className="text-sm text-gray-600 hover:text-gray-800"
                            onClick={() => setTasks(tasks.filter((task) => !task.completed))}
                        >
                            Clear completed tasks ({completedCount})
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TodoApp
