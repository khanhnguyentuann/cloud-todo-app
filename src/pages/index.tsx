import React, { useState, useLayoutEffect } from "react"
import { Header } from "@/components/Header"
import { Sidebar } from "@/components/Sidebar"
import { ContentHeader } from "@/components/ContentHeader"
import { TaskInput } from "@/components/TaskInput"
import { TaskItem } from "@/components/TaskItem"
import { SettingsPanel } from "@/components/SettingsPanel"
import { AccountMenu } from "@/components/AccountMenu"
import { useMobile } from "@/hooks/UseMobile"
import type { Task } from "@/types"

export default function Component() {
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: 1,
            text: "đi đánh bóng chày",
            completed: false,
            dueDate: "Mon, June 30",
            isImportant: false,
        },
    ])
    const [inputValue, setInputValue] = useState<string>("")
    const [activeView, setActiveView] = useState<string>("My Day")
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)
    const [settingsOpen, setSettingsOpen] = useState<boolean>(false)
    const [accountMenuOpen, setAccountMenuOpen] = useState<boolean>(false)

    const isMobile = useMobile()

    // On viewport change, adjust sidebar
    useLayoutEffect(() => {
        setSidebarOpen(!isMobile)
    }, [isMobile])

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
        setTasks(tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ))
    }

    const toggleImportant = (id: number) => {
        setTasks(tasks.map((task) =>
            task.id === id ? { ...task, isImportant: !task.isImportant } : task
        ))
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addTask()
    }

    return (
        <div className="h-screen flex flex-col" style={{ backgroundColor: "#FFFBF7" }}>
            <Header
                onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                onSettingsClick={() => setSettingsOpen(true)}
                onAccountClick={() => setAccountMenuOpen(true)}
            />

            <div className="flex flex-1 overflow-hidden relative">
                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    activeView={activeView}
                    onViewChange={setActiveView}
                    isMobile={isMobile}
                />

                <main className="flex-1 flex flex-col overflow-hidden" style={{ backgroundColor: "#FFFBF7" }}>
                    <ContentHeader title={activeView} date="Sunday, June 29" />

                    <div className="flex-1 p-3 sm:p-6 overflow-y-auto">
                        <TaskInput
                            value={inputValue}
                            onChange={setInputValue}
                            onAdd={addTask}
                            onKeyPress={handleKeyPress}
                        />

                        <div className="space-y-2">
                            {tasks.map((task) => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    onToggle={toggleTask}
                                    onToggleImportant={toggleImportant}
                                />
                            ))}
                        </div>
                    </div>
                </main>
            </div>

            <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
            <AccountMenu isOpen={accountMenuOpen} onClose={() => setAccountMenuOpen(false)} />
        </div>
    )
}
