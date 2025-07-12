import { useState, useLayoutEffect, useEffect } from "react"
import { Outlet } from "react-router-dom"
import { Header } from "@/components/features/Header"
import { Sidebar } from "@/components/features/Sidebar"
import { SettingsPanel } from "@/components/features/SettingsPanel"
import { AccountMenu } from "@/components/features/AccountMenu"
import { useMobile } from "@/hooks/useMobile"
import { useDarkMode } from "@/hooks/useDarkMode"
import { createTask, fetchTasks } from "@/store/task"
import { TaskDetailSidebar } from "@/components/features/TaskDetailSideBar"
import HelpPanel from "@/components/features/help-panel"
import { NotificationPanel } from "@/components/features/NotificationPanel"
import AccountView from "@/components/features/account-view"
import { LoginScreen } from "@/components/features/LoginScreen"
import { useAuth } from "@/hooks/useAuth"
import type { Task } from "@/types"
import { TaskContext } from "@/context/TaskContext"

export default function GlobalLayout() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [inputValue, setInputValue] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [reminder, setReminder] = useState("")
    const [repeat, setRepeat] = useState("")
    const [taskDetailSidebarOpen, setTaskDetailSidebarOpen] = useState(false)
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [settingsOpen, setSettingsOpen] = useState(false)
    const [accountMenuOpen, setAccountMenuOpen] = useState(false)
    const [viewMode, setViewMode] = useState<"grid" | "list">("list")
    const [sortBy, setSortBy] = useState("Creation date")
    const isMobile = useMobile()
    const { isDarkMode, toggleDarkMode } = useDarkMode()
    const [helpOpen, setHelpOpen] = useState(false)
    const [notificationOpen, setNotificationOpen] = useState(false)
    const [unreadNotificationCount] = useState(2)
    const [accountViewOpen, setAccountViewOpen] = useState(false)
    const { isAuthenticated, isLoading, signInWithGoogle, signOut, user } = useAuth()

    useEffect(() => {
        fetchTasks()
            .then(setTasks)
            .catch(err => console.error("Failed to load tasks:", err))
    }, [])

    useLayoutEffect(() => {
        setSidebarOpen(!isMobile)
        setTaskDetailSidebarOpen(false)
    }, [isMobile])

    const addTask = async () => {
        if (inputValue.trim() !== "") {
            try {
                await createTask({ text: inputValue.trim(), completed: false, dueDate, reminder, repeat })
                setInputValue("")
                setDueDate("")
                setReminder("")
                setRepeat("")
                const updatedTasks = await fetchTasks()
                setTasks(updatedTasks)
            } catch (err) {
                console.error("Failed to create task:", err)
            }
        }
    }

    const toggleTask = (id: number) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task))
    }

    const toggleImportant = (id: number) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, isImportant: !task.isImportant } : task))
    }

    const handleTaskSelect = (task: Task) => {
        setSelectedTask(task)
        setTaskDetailSidebarOpen(true)
    }

    const handleNotificationClick = () => {
        setNotificationOpen(!notificationOpen)
        setAccountMenuOpen(false)
        setSettingsOpen(false)
        setHelpOpen(false)
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!isAuthenticated) {
        return <LoginScreen onSignIn={signInWithGoogle} />
    }

    return (
        <TaskContext.Provider value={{
            tasks, setTasks, inputValue, setInputValue,
            dueDate, setDueDate, reminder, setReminder, repeat, setRepeat,
            addTask, toggleTask, toggleImportant,
            sortBy, setSortBy, viewMode, setViewMode,
            handleTaskSelect
        }}>
            <div className="h-screen flex flex-col">
                <div className="shrink-0">
                    <Header
                        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                        onSettingsClick={() => setSettingsOpen(true)}
                        onAccountClick={() => setAccountMenuOpen(true)}
                        onHelpClick={() => setHelpOpen(true)}
                        onNotificationClick={handleNotificationClick}
                        unreadNotificationCount={unreadNotificationCount}
                    />
                </div>
                <div className="flex flex-1">
                    <Sidebar
                        isOpen={sidebarOpen}
                        onClose={() => setSidebarOpen(false)}
                        isMobile={isMobile}
                    />
                    <div className="relative flex flex-1">
                        <main className="flex-1 overflow-y-auto">
                            <Outlet />
                        </main>
                        <TaskDetailSidebar
                            isOpen={taskDetailSidebarOpen}
                            onClose={() => setTaskDetailSidebarOpen(false)}
                            task={selectedTask}
                            isMobile={isMobile}
                        />
                    </div>
                </div>
                <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)}
                    isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
                <HelpPanel isOpen={helpOpen} onClose={() => setHelpOpen(false)} />
                <NotificationPanel isOpen={notificationOpen} onClose={() => setNotificationOpen(false)} />
                <AccountMenu isOpen={accountMenuOpen} onClose={() => setAccountMenuOpen(false)}
                    onViewAccount={() => setAccountViewOpen(true)} onSignOut={signOut} user={user} />
                <AccountView isOpen={accountViewOpen} onClose={() => setAccountViewOpen(false)} user={user} />
            </div>
        </TaskContext.Provider>
    )
}
